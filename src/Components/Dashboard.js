import React, { Component } from 'react'
import loadWeb3 from '../utils/loadWeb3'
import { Link } from 'react-router-dom'
import { Table } from 'reactstrap'
import Loader from './Loader'
import { Button } from 'reactstrap'
import Bitcoin from '../Images/Bitcoin.jpg'
import Ethereum from '../Images/Ethereum.jpg'
import getLiveCoindeskPrice from '../queries/getLiveCoindeskPrice'
import loadContract from '../utils/loadContract'
import loadAccount from '../utils/loadAccount'


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
            const dispensary = await loadContract();
            console.log(dispensary)
            this.setState({ account, dispensary })
            const productCount = await dispensary.methods.productCount().call()
            console.log(productCount)
            const product = await dispensary.methods.fetchProduct(1).call()
            const productProfileId = product.productProfile.productId
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
    
    getProduct = async (id) => {
        const product = await this.state.dispensary.methods.fetchProduct(id).call()
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
                <h1>{this.state.product.name} </h1>
                <h3>{this.state.product.categoryName} </h3>
                <h5>$ {this.state.product.productCost} per gram</h5>
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