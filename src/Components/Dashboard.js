import React, { Component } from 'react'
import loadWeb3 from '../utils/loadWeb3'
import { Link } from 'react-router-dom'
import { BsPlus, BsFileText } from 'react-icons/bs'
import { RiExchangeDollarFill } from 'react-icons/ri'
import { Table } from 'reactstrap'
import Loader from './Loader'
import VotedFor from './VotedFor'
import { Button, Form, FormGroup, Label, Input, Row, Col, Card, CardTitle, CardText } from 'reactstrap'
import Bitcoin from '../Images/Bitcoin.jpg'
import Ethereum from '../Images/Ethereum.jpg'
import getLiveCoindeskPrice from '../queries/getLiveCoindeskPrice'
import getLiveCoinPrice from '../queries/getLiveCoinPrice'
import getLiveETHUSD from '../queries/getLiveETHUSD'
import Dispensary from '../abis/Dispensary.json'
import loadAccount from '../utils/loadAccount'
import Web3 from 'web3'
import Products from './Products'
import CandidateForm from './CandidateForm'
import RegistrationForm from './RegistrationForm'
import EtherLogo from '../Images/EtherLogo.png'
import MyPieChart from './Graphs'
  


export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            dispensary: null,
            coindeskPrice: 0,
            coinapiPrice: 0,
            ethUSD: 0,
            account: '',
            product: [],
            productProfileId: 1,
            tabId: 1,
            loading: false
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3();
            const account = await loadAccount()
            const dispensary = await this.loadContract();
            console.log(dispensary)
            this.setState({ account, dispensary })
            const productCount = await dispensary.methods.productCount().call()
            console.log(productCount)
            const product = await dispensary.methods.fetchProduct(1).call()
            const productProfileId = product._productProfile.productId
            this.setState({ productCount, product, productProfileId})
            const coindeskPrice = await getLiveCoindeskPrice();
            this.setState({
                coindeskPrice,
                loading: false
            })
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

    async loadContract() {
            const web3 = window.web3
            return new web3.eth.Contract(Dispensary, "0xc4851e498AF8EA8C63EA6b9E71Bec07c402d405C") 
        }

    getProduct = async (_id) => {
        const product = await this.state.dispensary.methods.fetchProduct(_id).call()
        setTimeout(() => { this.setState({ product, productProfileId: this.state.tabId }); }, 10);
    }

    handleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }

    incrementTab = () => {
        this.setState({ tabId: this.state.tabId + 1})
        setTimeout(() => { this.getProduct(this.state.tabId); }, 10);
    }

    decrementTab = () => {
        this.setState({ tabId: this.state.tabId - 1})
        setTimeout(() => { this.getProduct(this.state.tabId); }, 10);

    }

    /*handleHasVoted = () => {
        this.setState({
            hasVoted: !this.state.hasVoted
        })
    }*/

    renderTipTable = () => {
        return(
            <Table striped style={{textAlign:'center', marginLeft: 'auto', marginRight: 'auto'}} >
                <thead>
                    <tr>
                        <th>Bitcoin</th>
                        <th>Ethereum</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            ${this.state.coindeskPrice}
                        </td>
                        <td>
                            ${this.state.ethUSD}
                        </td>
                    </tr>
                    <tr>
                        <td><img src={Bitcoin} alt='bitcoin' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', height: '20%', width: '20%'}} /></td>
                        <td><img src={Ethereum} alt='ethereum' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', height: '20%', width: '20%'}} /></td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    
    render() {
          return(
            <div style={{marginTop: '5%', textAlign: 'center'}}>
                <h1>{this.state.product._name} </h1>
                <h3>{this.state.product._categoryName} </h3>
                <h5>$ {this.state.product._productCost} per gram</h5>
                {<Link to={`/product/${this.state.productProfileId}`} >Strain Details</Link>}
                <br />
                {this.state.tabId > 1 && <Button color='danger' onClick={this.decrementTab}>Decrement</Button>}
                {this.state.tabId < this.state.productCount && <Button color='success' onClick={this.incrementTab}>Increment</Button>}
                <div style={{marginTop: '20%'}}>
                    {this.renderTipTable()}
                </div>
                {this.state.loading === true && <Loader />}
            </div>
        )
    }
}