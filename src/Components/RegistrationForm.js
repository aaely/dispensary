import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'
import loadContract from '../utils/loadContract'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import Loader from './Loader'


export default class RegistrationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            dob: '',
            license: '',
            email: '',
            phone: '',
            loading: false,
            dispensary: null,
            account: ''
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const account = await loadAccount()
            const dispensary = await loadContract()
            this.setState({ dispensary, account })
        } catch(error) {
            console.log(error)
        }
    }

    handleFirstName = (event) => {
        this.setState({
           firstName: event.target.value
        })
    }

    handleLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    }

    handleDOB = (event) => {
        this.setState({
            dob: event.target.value
        })
    }

    handleLicense = (event) => {
        this.setState({
            license: event.target.value
        })
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    registerCustomer = async () => {
        try {
            this.setState({ loading: true })
            await this.state.dispensary.methods.createCustomer(this.state.firstName, this.state.lastName, this.state.dob, this.state.license, this.state.email, this.state.phone).send({from: this.state.account})
            this.props.history.push('/products')
        } catch(error) {
            this.setState({ loading: false })
            console.log(error);
        }
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label>Please enter your first name here:</Label>
                    <Input type='text' name='firstName' id='firstName' onChange={this.handleFirstName} value={this.state.firstName} />
                </FormGroup>
                <FormGroup>
                    <Label>Please enter your last name here:</Label>
                    <Input type='text' name='lastName' id='lastName' onChange={this.handleLastName} value={this.state.lastName} />
                </FormGroup>
                <FormGroup>
                    <Label>Please enter your date of birth here:</Label>
                    <Input type='date' name='dob' id='dob' onChange={this.handleDOB} value={this.state.dob} />
                </FormGroup>
                <FormGroup>
                    <Label>Please enter your license number here:</Label>
                    <Input type='text' name='voterName' id='voterName' onChange={this.handleLicense} value={this.state.license} />
                </FormGroup>
                <FormGroup>
                    <Label>Please enter your email address here:</Label>
                    <Input type='text' name='voterName' id='voterName' onChange={this.handleEmail} value={this.state.email} />
                </FormGroup>
                <FormGroup>
                    <Label>Please enter your cell phone number here:</Label>
                    <Input type='text' name='voterName' id='voterName' onChange={this.handlePhone} value={this.state.phone} />
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderForm()}
                {this.state.loading === false && <Button color='success' onClick={this.registerCustomer.bind(this)}>Register</Button>}
                {this.state.loading === true && <Loader />}
            </div>
        )
    }
}