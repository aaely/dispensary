import React, { Component } from 'react'
import { Form, Col, Row, Table, Button, FormGroup, Label, Input } from 'reactstrap'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import loadContract from '../utils/loadContract'

export default class CreateLocation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            streetAddress: '',
            state: '',
            zip: '',
            city: '',
            taxRate: 0,
            nickname: '',
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

    createLocation = async () => {
        try {
            this.setState({ loading: true })
            console.log('good here')
            await this.state.dispensary.methods.createLocation(this.state.taxRate, this.state.nickname, this.state.streetAddress, this.state.city, this.state.state, this.state.zip).send({ from: this.state.account })
            console.log('good after creation')
            this.setState({ loading: false })
        } catch(error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    handleNickname = (event) => {
        this.setState({
            nickname: event.target.value
        })
    }

    handleStreet = (event) => {
        this.setState({
            streetAddress: event.target.value
        })
    }

    handleCity = (event) => {
        this.setState({
            city: event.target.value
        })
    }

    handleState = (event) => {
        this.setState({
            state: event.target.value
        })
    }

    handleZip = (event) => {
        this.setState({
            zip: event.target.value
        })
    }

    handleTax = (event) => {
        this.setState({
            taxRate: event.target.value
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='nickname' id='nickname'>Nickname of Location</Label>
                    <Input type='text' name='nickname' id='nickname' onChange={this.handleNickname} value={this.state.nickname} />
                </FormGroup>
                <FormGroup>
                    <Label name='street' id='street'>Street Address</Label>
                    <Input type='text' name='street' id='street' onChange={this.handleStreet} value={this.state.streetAddress} />
                </FormGroup>
                <FormGroup>
                    <Label name='city' id='city'>City</Label>
                    <Input type='text' name='city' id='city' onChange={this.handleCity} value={this.state.city} />
                </FormGroup>
                <FormGroup>
                    <Label name='state' id='state'>State</Label>
                    <Input type='text' name='state' id='state' onChange={this.handleState} value={this.state.state} />
                </FormGroup>
                <FormGroup>
                    <Label name='zip' id='zip'>Zip Code</Label>
                    <Input type='text' name='zip' id='zip' onChange={this.handleZip} value={this.state.zip} />
                </FormGroup>
                <FormGroup>
                    <Label name='tax' id='tax'>Tax Rate for Location</Label>
                    <Input type='number' name='tax' id='tax' onChange={this.handleTax} value={this.state.taxRate} />
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderForm()}
                <Button color='success' onClick={this.createLocation}>Create Location</Button>
            </div>
        )
    }
}