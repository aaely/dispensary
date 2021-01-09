import React, { Component } from 'react'
import { Button, Table, Row, Col } from 'reactstrap'
import loadContract from '../../utils/loadContract'
import loadWeb3 from '../../utils/loadWeb3'

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            dispensary: null,
            account: '',
            product: [],
            terpenes: [],
            cannabinoids: []
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const dispensary = await loadContract()
            const product = await dispensary.methods.fetchProduct(this.props.match.params.productId).call()
            this.setState({ dispensary, product})
            await this.getTerpenes()
            await this.getCannabinoids()
        } catch(error) {
            console.log(error)
        }
    }

    getTerpenes = async () => {
        let terpenes = []
        for(let i = 0; i < this.state.product.productProfile.terpenes.length; i++) {
            let response = await this.state.dispensary.methods.terpene(this.state.product.productProfile.terpenes[i]).call()
            terpenes.push(response)
        }
        this.setState({ terpenes })
    }

    getCannabinoids = async () => {
        let cannabinoids = []
        for(let i = 0; i < this.state.product.productProfile.cannabinoids.length; i++) {
            let response = await this.state.dispensary.methods.cannabinoid(this.state.product.productProfile.cannabinoids[i]).call()
            cannabinoids.push(response)
        }
        this.setState({ cannabinoids })
    }

    render() {
        return(
            <div style={{marginTop: '5%', display: 'block'}}>
                <h1 style={{textAlign: 'center'}}>{this.state.product.name}</h1>
                <br />
                <h3 style={{textAlign: 'center'}} >Category: {this.state.product.categoryName}</h3>
                <br />
                <h3 style={{textAlign: 'center'}} >Inventory: {this.state.product.quantity}</h3>
                <br />
                <div style ={{margin: 'auto', maxWidth: '25%'}}>
                    <img src={`${this.state.product.img}`} alt={this.state.product.id} />
                </div>
                <h1 style={{textAlign: 'center', marginTop: '5%'}} >Terpenes: </h1>
                <br />
                <Table style={{maxWidth: '70%', marginTop: '2%', marginLeft: 'auto', marginRight: 'auto'}} striped>
                    <thead>
                        <tr>
                            <th>
                                Terpene
                            </th>
                            <th>
                                Concentration
                            </th>
                            <th>
                                Scent
                            </th>
                            <th>
                                Effects
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.terpenes.map((terpene, index) => {
                            return(
                                <tr key={terpene.id} >
                                    <td>
                                        {terpene.name}
                                    </td>
                                    <td>
                                        {this.state.product.productProfile.terpeneConcentrations[index]}%
                                    </td>
                                    <td>
                                        {terpene.flavorDesc}
                                    </td>
                                    <td>
                                        {terpene.effectDesc}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <br />
                <h1 style={{textAlign: 'center'}}>Cannabinoids:</h1>
                <Table style={{maxWidth: '70%', marginTop: '2%', marginLeft: 'auto', marginRight: 'auto'}} striped>
                    <thead>
                        <tr>
                            <th>
                                Cannabinoid
                            </th>
                            <th>
                                Concentration
                            </th>
                            <th>
                                Effects
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cannabinoids.map((cannabinoid, index) => {
                            return(
                                <tr key={cannabinoid.id} >
                                    <td>
                                        {cannabinoid.name}
                                    </td>
                                    <td>
                                        {this.state.product.productProfile.cannabinoidConcentrations[index]}%
                                    </td>
                                    <td>
                                        {cannabinoid.effectDesc}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}