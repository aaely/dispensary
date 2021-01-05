import React, { Component } from 'react'
import loadWeb3 from '../utils/loadWeb3'
import Loader from './Loader'
import { Button, Card, CardTitle, CardText, Row, Col } from 'reactstrap'
import ReceiptDetails from './ReceiptDetails'
import Bitcoin from '../Images/Bitcoin.jpg'
import Ethereum from '../Images/Ethereum.jpg'
import getLiveETHUSD from '../queries/getLiveETHUSD'
import loadContract from '../utils/loadContract'
import loadAccount from '../utils/loadAccount'  


export default class Purchases extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dispensary: null,
            ethUSD: 0,
            account: '',
            receipts: [],
            tabId: 0,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3();
            const account = await loadAccount()
            const dispensary = await loadContract();
            this.setState({ account, dispensary })
            const purchases = await dispensary.methods.getReceipts(account).call()
            for(let i = 0; i < purchases.length; i++) {
                const receipt = await dispensary.methods.fetchReceipt(purchases[i]).call()
                console.log(receipt)
                this.setState({ receipts: [...this.state.receipts, receipt]})
            }

            this.setState({ loading: false })
            console.log(this.state)
            /*const ethUSD = await getLiveETHUSD();
            this.setState({
                ethUSD,
                loading: false
            })*/
        }
        catch(error) {
            console.log(error);
            this.setState({
                loading: false
            })
        }
    }

    incrementTab = () => {
        this.setState({ tabId: this.state.tabId + 1})
        setTimeout(() => { this.getProduct(this.state.tabId); }, 10);
    }

    decrementTab = () => {
        this.setState({ tabId: this.state.tabId - 1})
        setTimeout(() => { this.getProduct(this.state.tabId); }, 10);

    }

    getProduct = async (productList) => {
        for(let i = 0; i < productList.length; i++) {
            const product = await this.state.dispensary.fetchProduct(productList[i]).call()
            return product
        }
    }

    renderReceipts() {
        return(
            <div>
                {this.state.receipts.map((a, index) => {
                    return(
                        <Row style={{display: 'inline-block', marginLeft: '10%', marginRight: '10%'}} key={a.id} >
                            <Col sm="20">
                                <Card body>

                                    <CardTitle style={{textAlign: 'center'}} >Purchase #{index + 1}</CardTitle>
                                    
                                    {<CardText>Total before tax: ${a.rawTotal}</CardText>}
                                    
                                    <CardText>Tax: ${a.amountTax}</CardText>
                                    
                                    <CardText>Total: ${a.amountTotal}</CardText>
                                    
                                    <ReceiptDetails dispensary={this.state.dispensary} products={a.products} quantities={a.quantities} />

                                </Card>
                            </Col>
                        </Row>
                    )
                })}
            </div>
        )
    }

    renderNoPurchases() {
        return(
            <div> You have not made any purchases yet.</div>
        )
    }
    
    render() {
          return(
            <div style={{marginTop: '5%', textAlign: 'center'}}>
                {this.state.loading === false && this.state.receipts.length > 0 && this.renderReceipts()}
                {this.state.loading === false && this.state.receipts.length === 0 && this.renderNoPurchases()}
                {this.state.loading === true && <Loader />}
            </div>
        )
    }
}