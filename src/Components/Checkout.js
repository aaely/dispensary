import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardTitle, CardText } from 'reactstrap'
import loadAccount from '../utils/loadAccount'
import Loader from './Loader'
import getLiveETHUSD from '../queries/getLiveETHUSD'
import loadContract from '../utils/loadContract'
import loadWeb3 from '../utils/loadWeb3'
import Cart from './Cart'

export default class Checkout extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dispensary: null,
            account: '',
            cart: this.props.location.state.cart || [],
            loading: false,
            totalCost: this.props.location.state.totalCost || 0,
            isRegistered: false
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const account = await loadAccount()
            const dispensary = await loadContract()
            const isRegistered = await dispensary.methods.customerAccess(account).call()
            this.setState({ dispensary, account, isRegistered })
            console.log(this.state.cart)
        } catch(error) {
            console.log(error)
        }
    }

    updateTotalCost = async () => {
        let totalCost = 0
        for(let i = 0; i < this.state.cart.length; i++) {
            let cart = this.state.cart
            totalCost = parseInt(totalCost) + (parseInt(cart[i].cost) * parseInt(cart[i].quantity))
        }
        this.setState({ totalCost })
    }

    removeFromCart = (id) => {
        this.setState({ loading: true })
        let newCart = this.state.cart
        if (newCart.length === 1) {
            this.props.history.push('/products')
        }
        if (newCart.length >= 1) {
            let index = newCart.findIndex(x => x.id === id);
            newCart.splice(index, 1)
            this.setState({
                cart: newCart
            })
            setTimeout(() => { this.setState({ loading: false}) }, 200)
            this.updateTotalCost()
        }
    }

    getProductsArray = async () => {
        let ids = [];
        for(let i = 0; i < this.state.cart.length; i++) {
            ids.push(this.state.cart[i].id)
        }
        return ids
    }

    getQuantitiesArray = async () => {
        let quantities = [];
        for(let i = 0; i < this.state.cart.length; i++) {
            quantities.push(this.state.cart[i].quantity)
        }
        return quantities
    }

    purchase = async () => {
        try {
            const products = await this.getProductsArray()
            const quantities = await this.getQuantitiesArray()
            const conversion = await getLiveETHUSD()
            console.log(conversion)
            console.log(this.state.totalCost / conversion)
            const total = window.web3.utils.toWei(`${this.state.totalCost}`, 'Finney')
            this.setState({ loading: true })
            await this.state.dispensary.methods.purchaseProducts(products, quantities, 1).send({ from: this.state.account, value: total });
            this.props.history.push('/products')
        } catch (error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    navigateTo() {
        window.location.href='/registercustomer'
    }
    
    render() {
        return(
            <div style={{display: 'block', maxWidth: '70%'}} >
               {!this.state.loading && <Cart cart={this.state.cart} totalCost={this.state.totalCost} action1={this.removeFromCart} />}
               {!this.state.loading && this.state.isRegistered && <Button color='success' onClick={this.purchase.bind(this)}>Purchase</Button>}
               {!this.state.loading && !this.state.isRegistered && <Button color='success' onClick={this.navigateTo.bind(this)} >Registration Required before Purchase</Button>}  
               {this.state.loading && <Loader />} 
            </div>
        )
    }
}