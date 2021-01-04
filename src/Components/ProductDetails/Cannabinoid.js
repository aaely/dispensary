import React, { Component } from 'react'
import { Button, Table, Row, Col } from 'reactstrap'


export default class Cannabinoids extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return(
            <Table style={{maxWidth: '70%', marginTop: '2%', marginLeft: 'auto', marginRight: 'auto'}} striped>
                <thead>
                    <tr>
                        <th>
                            Cannabinoid
                        </th>
                        <th>
                            Effects
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {this.props.cannabinoid.name}
                        </td>
                        <td>
                            {this.props.cannabinoid.effectDesc}
                        </td>
                    </tr>                        
                </tbody>
            </Table>
        )
    }
}