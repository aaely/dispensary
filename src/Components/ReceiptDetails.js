import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'

export default class ReceiptDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            products: [],
            loading: true
        }
    }

    async componentDidMount() {
        try{
            for(let i = 0; i < this.props.products.length; i++) {
                const product = await this.props.dispensary.methods.fetchProduct(this.props.products[i]).call()
                this.setState({ products: [...this.state.products, product]})
            }
            this.setState({ loading: false })
            console.log(this.state)
        } catch(error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    renderTable() {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>
                            Product
                        </th>
                        <th>
                            Quantity
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {this.state.products.map((product, index) => {
                            console.log(product)
                            return(
                                <tr key={product.productProfile.productId}>
                                    <td>
                                        <Link to={`/product/${product.productProfile.productId}`}> {product.name}</Link>
                                    </td>
                                    <td>
                                        {this.props.quantities[index]}g
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderTable()}
            </div>
        )
    }
}
