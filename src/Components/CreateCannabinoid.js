import React, { Component } from 'react'
import { Form, Col, Row, Table, Button, FormGroup, Label, Input } from 'reactstrap'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import loadContract from '../utils/loadContract'

export default class CreateCannabinoid extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cannabinoidName: '',
            cannabinoidDesc: '',
            loading: true,
            account: ''
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const account = await loadAccount()
            const dispensary = await loadContract()
            this.setState({ account, dispensary, loading: false })
            console.log(this.state)

        } catch(error) {
            this.setState({ loading: false })
            console.log(error)
        }
    }

    createCannabinoid = async () => {
        try {
            this.setState({ loading: true })
            await this.state.dispensary.methods.createCannabinoid(this.state.cannabinoidName, this.state.cannabinoidDesc).send({ from: this.state.account })
            this.setState({ loading: false })
        } catch(error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    handleName = (event) => {
        this.setState({
            cannabinoidName: event.target.value
        })
    }

    handleDesc = (event) => {
        this.setState({
            cannabinoidDesc: event.target.value
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='name' id='name'>Name of Cannabinoid</Label>
                    <Input type='text' name='name' id='name' onChange={this.handleName} value={this.state.cannabinoidName} />
                </FormGroup>
                <FormGroup>
                    <Label name='desc' id='desc'>Description of Cannabinoid</Label>
                    <Input type='text' name='desc' id='desc' onChange={this.handleDesc} value={this.state.cannabinoidDesc} />
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderForm()}
                <Button color='success' onClick={this.createCannabinoid}>Create Cannabinoid</Button>
            </div>
        )
    }
}