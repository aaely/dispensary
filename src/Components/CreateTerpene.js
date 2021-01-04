import React, { Component } from 'react'
import { Form, Col, Row, Table, Button, FormGroup, Label, Input } from 'reactstrap'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import loadContract from '../utils/loadContract'

export default class CreateTerpene extends Component {

    constructor(props) {
        super(props)
        this.state = {
            terpeneName: '',
            flavorDesc: '',
            effectDesc: '',
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

    createTerpene = async () => {
        try {
            this.setState({ loading: true })
            await this.state.dispensary.methods.createTerpene(this.state.terpeneName, this.state.flavorDesc, this.state.effectDesc).send({ from: this.state.account })
            this.setState({ loading: false })
        } catch(error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    handleName = (event) => {
        this.setState({
            terpeneName: event.target.value
        })
    }

    handleDesc = (event) => {
        this.setState({
            effectDesc: event.target.value
        })
    }

    handleFlavor = (event) => {
        this.setState({
            flavorDesc: event.target.value
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='name' id='name'>Name of Terpene</Label>
                    <Input type='text' name='name' id='name' onChange={this.handleNickname} value={this.state.nickname} />
                </FormGroup>
                <FormGroup>
                    <Label name='desc' id='desc'>Description of Terpene Flavor</Label>
                    <Input type='text' name='desc' id='desc' onChange={this.handleFlavor} value={this.state.flavorDesc} />
                </FormGroup>
                <FormGroup>
                    <Label name='desc' id='desc'>Description of Terpene Effect</Label>
                    <Input type='text' name='desc' id='desc' onChange={this.handleDesc} value={this.state.effectDesc} />
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderForm()}
                <Button color='success' onClick={this.createTerpene}>Create Terpene</Button>
            </div>
        )
    }
}