import React, { Component } from 'react'
import { Button, Row, Col, Table } from 'reactstrap'

export default class Products extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    
    render() {
        return(
                <Table striped>
                    <thead>
                        <tr>
                            <th>
                                Item Name
                            </th>
                            <th>
                                Item Category
                            </th>
                            <th>
                                Item Cost
                            </th>
                            <th>
                                Item Quantity
                            </th>
                        </tr>
                    </thead>                   
                {this.props.cart.map(item => {
                    return(
                        <tbody key={item.id} >
                            <tr>
                                <td>
                                    {item.name}
                                </td>
                                <td>
                                    {item.catName}
                                </td>
                                <td>
                                    {item.cost}
                                </td>
                                <td>
                                    {item.quantity}
                                </td>
                                <td>
                                    <Button color='danger' onClick={this.props.action1.bind(this, item.id)}>Remove</Button>
                                </td>
                            </tr>
                        </tbody>
                    )
                })}
                <tbody>
                    <tr>
                            <td>
                                Total Cost:
                            </td>
                            <td>
                                ${parseFloat(this.props.totalCost).toFixed(2)}
                            </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
}