import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardTitle, CardText } from 'reactstrap'
import Dispensary from '../abis/Dispensary.json'
import loadWeb3 from '../utils/loadWeb3'

export default class ProductDetails extends Component {

    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            dispensary: null,
            account: '',
            product: []
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const dispensary = await this.loadContract()
            console.log(this.props.match.params.productId)
            const product = await dispensary.methods.fetchProduct(this.props.match.params.productId).call()
            this.setState({ dispensary, product})
            console.log(product)
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

    render() {
        return(
            <Row style={{display: 'inline-block', marginLeft: '10%', marginRight: '10%'}} key={this.state.tabId} >
                <Col sm="20">
                    <Card body>
                        <CardTitle style={{textAlign: 'center'}} >{this.state.product._name}</CardTitle>
                        
                        <CardText>{this.state.product._categoryName}</CardText>
                        
                        <CardText>{this.state.product._quantity}</CardText>
                    </Card>
                </Col>
            </Row>
        )
    }
}