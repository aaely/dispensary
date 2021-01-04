import React, { Component } from 'react'
import { Button, Table, Row, Col } from 'reactstrap'


export default class Terpenes extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: false })
        } catch(error) {
            this.setState({
                loading: false
            })
            console.log(error)
        }
    }

    renderTable() {
        return(
            <Table style={{maxWidth: '70%', marginTop: '2%', marginLeft: 'auto', marginRight: 'auto'}} striped>
                <thead>
                    <tr>
                        <th>
                            Terpene
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
                    <tr>
                        <td>
                            {this.props.terpene.name}
                        </td>
                        <td>
                            {this.props.terpene.flavorDesc}
                        </td>
                        <td>
                            {this.props.terpene.effectDesc}
                        </td>
                    </tr>                        
                </tbody>
            </Table>
        )
    }

    render() {
        return(
                <React.Fragment>
                    {this.state.loading === false && this.renderTable()}
                </React.Fragment>
        )
    }
}