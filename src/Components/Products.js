import React, { Component } from 'react'
import { Button, Row, Col, Card, CardTitle, CardText } from 'reactstrap'
import { Link } from 'react-router-dom'
import loadContract from '../utils/loadContract'
import loadWeb3 from '../utils/loadWeb3'
import Cart from './Cart'
import { FaCartPlus } from 'react-icons/fa'

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
            totalCost: 0,
            isCollapsed: true
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const dispensary = await loadContract()
            const productCount = await dispensary.methods.productCount().call()
            for(let i = 1; i <= productCount; i++) {
                const product = await dispensary.methods.fetchProduct(i).call()
                this.setState({ products: [...this.state.products, product]})
            }
            console.log(this.state.products)
            this.setState({ dispensary, productCount })
        } catch(error) {
            console.log(error)
        }
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
        this.updateTotalCost()
    }

    addToCart = (id, name, catName, cost, quantity) => {
        this.setState({ loading: true })
        let item = { id, name, catName, cost, quantity }
        let newCart = this.state.cart
        let index = newCart.findIndex(x => x.id === id);
        console.log(index)
        if (index >= 0) {
            newCart[index].quantity = newCart[index].quantity + quantity
            this.setState({cart: newCart})
            this.updateTotalCost()
            console.log('updated existing item')
            }
        if (index < 0 && newCart.length >= 1) {
            this.setState({ cart: [...this.state.cart, item]})
            setTimeout(() => {this.updateTotalCost()}, 100)
            console.log('new item added')
            }
        if (index < 0 && newCart.length === 0) {
            this.setState({ cart: [...this.state.cart, item] })
            setTimeout(() => {this.setState({ totalCost: cost * quantity})}, 100)
            console.log('first item')
            }
        setTimeout(() => { this.setState({ loading: false}) }, 500)
    }

    updateTotalCost = async () => {
        let totalCost = 0
        for(let i = 0; i < this.state.cart.length; i++) {
            let cart = this.state.cart
            totalCost = parseInt(totalCost) + (parseInt(cart[i].cost) * parseInt(cart[i].quantity))
        }
        this.setState({ totalCost })
    }

    handleCollapsed = () => {
        this.setState({ isCollapsed: !this.state.isCollapsed })
    }
    
    renderCart() {
        return(
            <React.Fragment>
                <a href='#' onClick={this.handleCollapsed}>
                <FaCartPlus />
                {this.state.cart.length}
                </a>
                <Cart cart={this.state.cart} totalCost={this.state.totalCost} action1={this.removeFromCart} />
                <Link to={{
                pathname: '/checkout',
                state: {
                        cart: this.state.cart,
                        totalCost: this.state.totalCost
                    }
                }} >
                    Checkout
                </Link>
            </React.Fragment>
        )
    }

    render() {
        return(
            <div style={{marginTop: '3%'}}>
                <h2 style={{textAlign: 'center', marginBottom: '5%'}}>Available Products</h2>
                {this.state.products.map(a => {
                    return(
                        <Row style={{display: 'inline-block', marginLeft: '10%', marginRight: '10%'}} key={a.productProfile.productId} >
                            <Col sm="20" >
                                <Card body>

                                    <CardTitle style={{textAlign: 'center'}} ><Link to={`/product/${a.productProfile.productId}`}>{a.name}</Link></CardTitle>
                                                                        
                                    <CardText>{a.categoryName}</CardText>
                                    
                                    <CardText>{a.quantity}</CardText>
                                    
                                    <CardText>${a.productCost} per gram</CardText>

                                    {this.state.loading === false && <Button color='success' onClick={this.addToCart.bind(this, a.productProfile.productId, a.name, a.categoryName, a.productCost, 1)}>1 Gram</Button>}
                                    {this.state.loading === false && <Button color='success' style={{marginTop: '2%'}} onClick={this.addToCart.bind(this, a.productProfile.productId, a.name, a.categoryName, a.productCost, 3)}>1/8</Button>}
                                    {this.state.loading === false && <Button color='success' style={{marginTop: '2%'}} onClick={this.addToCart.bind(this, a.productProfile.productId, a.name, a.categoryName, a.productCost, 7)}>1/4</Button>}
                                    {this.state.loading === false && <Button color='success' style={{marginTop: '2%'}} onClick={this.addToCart.bind(this, a.productProfile.productId, a.name, a.categoryName, a.productCost, 14)}>1/2</Button>}
                                    {this.state.loading === false && <Button color='success' style={{marginTop: '2%'}} onClick={this.addToCart.bind(this, a.productProfile.productId, a.name, a.categoryName, a.productCost, 28)}>1 Oz</Button>}

                                </Card>
                            </Col>
                        </Row>
                    )
                })}
                {!this.state.isCollapsed && 
                <div style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}} >
                    <a href='#' onClick={this.handleCollapsed}>
                        Cart {'\u00A0'}
                    <FaCartPlus />
                    {this.state.cart.length}
                    </a>
                </div>} 
                {this.state.isCollapsed && this.state.cart.length > 0 && <div style={{maxWidth: '30%', marginLeft: 'auto', marginRight: 'auto'}}>{this.renderCart()}</div>}
            </div>
        )
    }
}