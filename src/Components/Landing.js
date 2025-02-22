import React, { Component } from 'react'
import Web3 from 'web3'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import img1 from '../Images/Metamask.png'
import img2 from '../Images/Metamask2.png'
import img3 from '../Images/Metamask3.png'
import Ethereum from '../Images/Ethereum.jpg'
import Bitcoin from '../Images/Bitcoin.jpg'
import getLiveETHUSD from '../queries/getLiveETHUSD'
import loadNetID from '../utils/loadNetID'
import getLiveCoindeskPrice from '../queries/getLiveCoindeskPrice'
import Dispensary from '../abis/Dispensary.json'
import step1 from '../Images/Step1.jpg'
import step2 from '../Images/Step2.jpg'
import step3 from '../Images/Step3.jpg'
import step4 from '../Images/Step4.jpg'
import step5 from '../Images/Step5.jpg'
import step6 from '../Images/Step6.jpg'
import EtherLogo from '../Images/EtherLogo.png'
  


export default class Dashboard extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tabId: 0,
            account: '',
            dispensary: null,
            bitcoinPrice: 0,
            ethereumPrice: 0,
            networkId: 0,
            path: '',
            coinDeskPrice: 0
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3();
            const account = await loadAccount();
            const networkId = await loadNetID();
            this.setState({
                account, networkId
            })
            const bitcoinPrice = await getLiveCoindeskPrice();
            this.setState({
                bitcoinPrice
            })
            const ethereumPrice = await getLiveETHUSD();
            this.setState({
                ethereumPrice
            })
            console.log(this.state)
        }
        catch(error) {
            console.log(error);
        }
    }

    incrementTab = () => {
        this.setState({
            tabId: this.state.tabId + 1
        })
    }

    decrementTab = () => {
        this.setState({
            tabId: this.state.tabId - 1
        })
    }

    setPath = (path) => {
        this.setState({
            path: path,
            tabId: this.state.tabId + 1
        })
    }

    renderMobilePC = () => {
        return(
            <div>
                <h4>
                    Are you currently using a <br /> 
                    <a href='#' onClick={this.setPath.bind(this, 'Mobile')} >Mobile Device</a> <br />
                    Or are you using a <br />
                    <a href='#' onClick={this.setPath.bind(this, 'PC')} >Dekstop/Laptop</a>
                </h4>
            </div>
        )
    }

    renderCoinbaseWallet = () => {
        return(
            <div>
                <h3>Android: <a href='https://play.google.com/store/apps/details?id=org.toshi' target='_blank' rel="noreferrer" style={{fontSize: '24px', marginBottom: '10px'}}>Coinbase Wallet for Android</a></h3>
                <h3>iPhone: <a href='https://apps.apple.com/us/app/coinbase-wallet/id1278383455' target='_blank' rel="noreferrer" style={{fontSize: '24px', marginBottom: '10px'}}>Coinbase Wallet for iPhone</a></h3>
                <h5>You will need to get the wallet set up, create a pin, either back up the phrase or not, etc. Once complete, you will need to do the following:</h5>
                <h3>Step 1: </h3><img src={step1} alt='step1' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3>Step 2: </h3><img src={step2} alt='step2' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3>Step 3: </h3><img src={step3} alt='step3' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3>Step 4: </h3><img src={step4} alt='step4' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3>Step 5: </h3><img src={step5} alt='step5' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3>Step 6: </h3><img src={step6} alt='step6' style={{maxHeight: '400px', maxWidth: window.screen.availWidth, marginLeft: 'auto', marginRight: 'auto'}} />
                <h3 style={{backgrounColor: 'red'}}>After setting the active network to Gorli, you will need to refresh the page</h3>
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Go Back</Button>
                <Button onClick={this.incrementTab} color='success' style={{margin: '0 auto', marginTop: '10px'}} >I Have Coinbase Wallet</Button>
            </div>
        )
    }

    renderMetamaskLink = () => {
        return(
            <div style={{textAlign: 'center'}} >
                <h3>You will need MetaMask in order to participate. It is a simple browser extension and can be found here:</h3> 
                <br />
                <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn' target='_blank' rel="noreferrer" style={{fontSize: '24px', marginBottom: '10px'}} >MetaMask</a>
                <br />
                <img src={img1} alt='Metamask' style={{marginLeft: 'auto', marginRight: 'auto', borderStyle: 'solid', borderColor: 'black', borderWidth: '3px', marginTop: '10px', maxWidth: window.screen.availWidth}} />
                <br />
                <h3 style={{marginTop: '10px', backgroundColor: 'red'}} >If you do not have a wallet phrase to import, just create a new wallet.</h3>
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Go Back</Button>
                <Button onClick={this.incrementTab} color='success' style={{margin: '0 auto', marginTop: '10px'}} >I Have Metamask</Button>
            </div>
        )
    }

    renderKovanMobileFailure = () => {
        return(
            <div>
                <h3 style={{backgroundColor: 'red'}}>You are not connected to the Kovan Network <br /> 
                Please go back the to previous page for instructions on how to do this. <br />
                After changing networks, you will need to refresh the browser page.</h3>
                <br />
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Go Back</Button>
            </div>
        )
    }

    renderKovanPCFailure = () => {
        return(
            <div>
                <h3>You will need to set metamask to the Kovan Network</h3>
                <br />
                {this.state.networkId !== 5 && <h3 style={{backgroundColor: 'red'}} >You are not connected to the correct network <br /> Please connect to the Kovan network and refresh the page</h3>}
                <h5>Step 1:</h5>
                <br />
                <img src={img2} alt='Metamask 2' style={{marginLeft: 'auto', marginRight: 'auto', borderStyle: 'solid', borderColor: 'black', borderWidth: '3px', marginTop: '10px', maxWidth: window.screen.availWidth}} />
                <br />
                <h5>Step 2:</h5>
                <br />
                <img src={img3} alt='Metamask 3' style={{marginLeft: 'auto', marginRight: 'auto', borderStyle: 'solid', borderColor: 'black', borderWidth: '3px', marginTop: '10px', maxWidth: window.screen.availWidth}} />
                <br />
                <h3 style={{backgroundColor: 'red', marginTop: '5px'}} >You are currently not connected to the Kovan Network, please follow the above instructions and refresh the page</h3>
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Go Back</Button>
                {this.state.networkId === 5 && <Button onClick={this.incrementTab} color='success' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >I am on Goerli</Button>}
            </div>
        )
    }

    renderKovanSuccess = () => {
        return(
            <div>
                <h3 style={{backgroundColor: 'green'}}>You are currently connected to the Kovan Network, please proceed to get funds</h3>
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Go Back</Button>
                {this.state.networkId === 42 && <Button onClick={this.incrementTab} color='success' style={{margin: '0 auto', marginRight: '5px', marginLeft: '5px', marginTop: '5px'}} >Proceed</Button>}
            </div>
        )
    }

    renderLink = () => {
        return(
            <div style={{textAlign: 'center', justifyContent: 'center'}} >
                <h3>Copy this value:</h3> 
                <br />
                {this.state.account !== null && this.state.account !== '' && <strong style={{fontSize: '30px', backgroundColor: 'yellow'}} >{this.state.account}</strong>}
                {this.state.account === null && <strong style={{fontSize: '30px', backgroundColor: 'red'}} >Your wallet is not connected. Refresh the page and try again.</strong>} 
                {this.state.account === '' && <strong style={{fontSize: '30px', backgroundColor: 'red'}} >Your wallet is not connected. Refresh the page and try again.</strong>} 
                <br />
                <br />
                <h3>into the input field on the page of the below link to request funds!</h3>
                <h1><a href='https://goerli-faucet.slock.it/' target='_blank' rel="noreferrer"  >Goerli Faucet</a></h1>
                <br />
                <Button onClick={this.decrementTab} color='danger' style={{margin: '0 auto', marginTop: '5px', marginRight: '5px', marginLeft: '5px'}} >Go Back</Button>
                <Button onClick={this.incrementTab} color='success' style={{margin: '0 auto', marginTop: '5px', marginRight: '5px', marginLeft: '5px'}} >I Have Funds</Button>
            </div>
        )
    }

    renderTipTable = () => {
        return(
            <Table striped>
                <thead>
                    <tr>
                        <th>Crypto Coin</th>
                        <th>QR Code</th>
                        <th>Exchange Rate</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>BTC</td>
                        <td><img src={Bitcoin} alt='bitcoin' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', height: '20%', maxWidth: window.screen.availWidth}} /></td>
                        <td> ${this.state.bitcoinPrice} </td>
                    </tr>
                    <tr>
                        <td>ETH</td>
                        <td><img src={Ethereum} alt='ethereum' style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', height: '20%', maxWidth: window.screen.availWidth}} /></td>
                        <td> ${this.state.ethereumPrice} </td>
                    </tr>
                </tbody>
            </Table>
        )
    }
    
    render() {
        
          return(
            <div style={{marginLeft: '5%', marginRight: '5%', marginTop: '3%', textAlign: 'center', backgroundImage: `url(${EtherLogo})`, backgroundPosition: 'center', backgroundSize: 'contain'}} >
                <h1 style={{textAlign: 'center'}}>Welcome to DispensaryName</h1>
                <br />
                <h3>This app is a dispensary user managerment and POS system that runs on the Ethereum Blockchain</h3>
                <br />
                <div style={{textAlign: 'center'}} >
                    {this.state.tabId === 0 && this.renderMobilePC()}
                    {this.state.tabId === 1 && this.state.path === 'PC' && this.renderMetamaskLink()}
                    {this.state.tabId === 1 && this.state.path === 'Mobile' && this.renderCoinbaseWallet()}
                    {this.state.tabId === 2 && this.state.networkId === 42 && this.renderKovanSuccess()}
                    {this.state.tabId === 2 && this.state.networkId !== 42 && this.state.path === 'Mobile' && this.renderKovanMobileFailure()}
                    {this.state.tabId === 2 && this.state.networkId !== 42 &&  this.state.path === 'PC' && this.renderKovanPCFailure()}
                    {this.state.tabId === 3 && this.renderLink()}
                    {this.state.tabId === 4 && <Link to='/Dashboard'
                                                 style={{fontSize: '40px'}}
                                                >
                                                Proceed to Store</Link>}
                    {this.state.tabId === 4 && <h3 style={{textAlign: 'center', marginTop: '5%'}}>Tips Appreciated </h3>}
                    {this.state.tabId === 4 && this.renderTipTable()}
                </div>
            </div>
        )
    }
}