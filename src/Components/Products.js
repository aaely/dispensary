import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardTitle, CardText } from 'reactstrap'
import Dispensary from '../abis/Dispensary.json'
import loadWeb3 from '../utils/loadWeb3'

export default class Products extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            dispensary: null,
            account: '',
            products: [],
            cart: [],
            loading: false,
            totalCost: 0
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const dispensary = await this.loadContract()
            const productCount = await dispensary.methods.productCount().call()
            for(let i = 1; i <= productCount; i++) {
                const product = await dispensary.methods.fetchProduct(i).call()
                //const newValue = await this.getLocationName(product._locations[0])
                console.log(product)
                this.setState({ products: [...this.state.products, product]})
            }
            console.log(this.state.products)
            this.setState({ dispensary, productCount })
        } catch(error) {
            console.log(error)
        }
    }

    async loadContract() {
        const web3 = window.web3
        return new web3.eth.Contract(Dispensary, "0xc4851e498AF8EA8C63EA6b9E71Bec07c402d405C") 
    }

    getProduct = async (_id) => {
        const product = await this.state.dispensary.methods.fetchProduct(_id).call()
        setTimeout(() => { this.setState({ product }); }, 100);
    }

    getLocationName = async (_id) => {
        const name = await this.state.dispensary.methods.location(_id).call()
        return name.nickname
    }

    removeFromCart = (id) => {
        this.setState({ loading: true })
        let newCart = this.state.cart
        let index = newCart.findIndex(x => x.id === id);
        newCart.splice(index, 1)
        this.setState({
            cart: newCart
        })
        setTimeout(() => { this.setState({ loading: false}) }, 200)
        let totalCost = this.updateTotalCost()
        setTimeout(() => { this.setState({ totalCost }) }, 200)
    }

    addToCart = (id, name, catName, cost, quantity) => {
        this.setState({ loading: true })
        let item = { id, name, catName, cost, quantity }
        let newCart = this.state.cart
        let index = newCart.findIndex(x => x.id === id);
        if (index >= 0) {
            newCart[index].quantity = newCart[index].quantity + quantity
            newCart[index].cost = cost * newCart[index].quantity
            this.setState({cart: newCart})
            this.updateTotalCost()
            console.log('updated existing item')
            }
        if (index < 0 && newCart.length >= 1) {
            this.setState({ cart: [...this.state.cart, item]})
            setTimeout(() => {this.updateTotalCost()}, 500)
            console.log('new item added')
            }
        if (index < 0 && newCart.length === 0) {
            this.setState({ cart: [...this.state.cart, item], totalCost: cost*quantity })
            console.log('first item')
            }
        setTimeout(() => { this.setState({ loading: false}) }, 500)
        setTimeout(() => { console.log(this.state.cart) }, 500)
        this.updateTotalCost()
    }

    updateTotalCost = () => {
        let totalCost = 0
        for(let i = 0; i < this.state.cart.length; i++) {
            let cart = this.state.cart
            totalCost = parseInt(totalCost) + parseInt(cart[i].cost)
            console.log(totalCost)
        }
        console.log(totalCost)
        this.setState({ totalCost })
    }
    
    render() {
        return(
            <div>
                {this.state.cart.map(cart => {
                    return(
                        <React.Fragment>
                            {cart.id}   <Button color='danger' onClick={this.removeFromCart.bind(this, cart.id)} >Remove</Button><br />
                            {cart.name} <br />
                            {cart.catName} <br />
                            {cart.cost} <br />
                            {cart.quantity} <br />
                        </React.Fragment>
                    )
                })}
                <p>Total cost: $ {this.state.totalCost} </p>
                {this.state.products.map(a => {
                    return(
                        <Row style={{display: 'inline-block', marginLeft: '10%', marginRight: '10%'}} key={a._productProfile.productId} >
                            <Col sm="20">
                                <Card body>
                                    <CardTitle style={{textAlign: 'center'}} >{a._name}</CardTitle>
                                    
                                    <CardText>{a._categoryName}</CardText>
                                    
                                    <CardText>{a._quantity}</CardText>
                                    
                                    <CardText>${a._productCost} per gram</CardText>

                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a._productProfile.productId, a._name, a._categoryName, a._productCost, 1)}>1 Gram</Button>}
                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a._productProfile.productId, a._name, a._categoryName, a._productCost, 3)}>1/8</Button>}
                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a._productProfile.productId, a._name, a._categoryName, a._productCost, 7)}>1/4</Button>}
                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a._productProfile.productId, a._name, a._categoryName, a._productCost, 14)}>1/2</Button>}
                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a._productProfile.productId, a._name, a._categoryName, a._productCost, 28)}>1 Oz</Button>}

                                </Card>
                            </Col>
                        </Row>
                    )
                })}    
                
            </div>
        )
    }
}