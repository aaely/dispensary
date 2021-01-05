import React, { Component } from 'react'
import { Button } from 'reactstrap'
import loadWeb3 from '../../utils/loadWeb3'
import loadContract from '../../utils/loadContract'
import AddCannabinoids from './AddCannabinoids'
import AddTerpenes from './AddTerpenes'
import AddLocation from './AddLocation'
import loadAccount from '../../utils/loadAccount'
import ProductInfo from './ProductInfo'

export default class AddProduct extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dispensary: null,
            locations: [],
            terpenes: [],
            cannabinoids: [],
            name: '',
            category: '',
            terpeneConcentrations: [],
            cannabinoidConcentrations: [],
            productCount: 0,
            tabId: 0,
            loading: true,
            cost: 0,
            quantity: 0,
            account: '',
            isManager: false
        }
    }

    async componentDidMount() {
        try {
            this.setState({ loading: true })
            await loadWeb3()
            const account = await loadAccount()
            const dispensary = await loadContract()
            this.setState({ dispensary, account })
            const productCount = await this.state.dispensary.methods.productCount().call()
            await this.isManager()
            this.setState({ productCount, loading: false })
            console.log(this.state)
        } catch(error) {
            console.log(error)
        }
    }

    createProduct = async () => {
        this.setState({ loading: true })
        console.log(this.state.name, this.state.category, this.state.cost, this.state.quantity, this.state.locations, this.state.terpenes, this.state.cannabinoids, this.state.terpeneConcentrations, this.state.cannabinoidConcentrations)
        await this.state.dispensary.methods.createProduct(this.state.name, this.state.category, this.state.cost, this.state.quantity, this.state.locations, this.state.terpenes, this.state.cannabinoids, this.state.terpeneConcentrations, this.state.cannabinoidConcentrations).send({from: this.state.account})
        this.props.history.push('/products')
        this.setState({ loading: false })
    }

    isManager = async () => {
        let isManager = await this.state.dispensary.methods.manager(this.state.account).call()
        this.setState({ isManager })
    }

    incrementTabId = () => {
        this.setState({
            tabId: this.state.tabId + 1
        })
        console.log(this.state.tabId)
    }

    decrementTabId = () => {
        this.setState({
            tabId: this.state.tabId - 1
        })
    }

    handleName = async (value) => {
        await this.setState({
            name: value
        })
        console.log(this.state.name)
    }

    handleCost = async (value) => {
        await this.setState({
            cost: value
        })
    }

    handleQuantity = async (value) => {
        await this.setState({
            quantity: value
        })
    }

    handleCategory = async (value) => {
        await this.setState({
            category: value
        })
        console.log(this.state.category)
    }

    handleLocations = async (value) => {
        await this.setState({
            locations: [...this.state.locations, value]
        })
        console.log(this.state.locations)
    }

    handleTerpenes = async (value) => {
        await this.setState({
            terpenes: [...this.state.terpenes, value]
        })
        console.log(this.state.terpenes)
    }

    handleCannabinoids = async (value) => {
        await this.setState({
            cannabinoids: [...this.state.cannabinoids, value]
        })
        console.log(this.state.cannabinoids)
    }

    handleTerpeneConcentrations = async (value) => {
        await this.setState({
            terpeneConcentrations: [...this.state.terpeneConcentrations, value]
        })
        console.log(this.state.terpeneConcentrations)
    }

    handleCannabinoidConcentrations = async (value) => {
        await this.setState({
            cannabinoidConcentrations: [...this.state.cannabinoidConcentrations, value]
        })
        console.log(this.state.cannabinoidConcentrations)
    }

    renderContent() {
        return(
            <React.Fragment>
                {this.state.tabId === 0 && <ProductInfo dispensary={this.state.dispensary} quantity={this.state.quantity} name={this.state.name} category={this.state.category} cost={this.state.cost} action1={this.handleName} action2={this.handleCategory} action3={this.handleCost} action4={this.handleQuantity} />}
                {this.state.tabId === 0 && <Button color='success' onClick={this.incrementTabId} >Next</Button> }
                {this.state.tabId === 1 && <AddTerpenes dispensary={this.state.dispensary} terpenes={this.state.terpenes} terpeneConcentrations={this.state.terpeneConcentrations} action1={this.handleTerpenes} action2={this.handleTerpeneConcentrations} />}
                {this.state.tabId === 1 && <Button style={{marginBottom: '1%'}} color='success' onClick={this.incrementTabId.bind(this)} >Next</Button> }
                <br />
                {this.state.tabId === 1 && <Button style={{marginTop: '1%'}} color='danger' onClick={this.decrementTabId.bind(this)} >Back</Button> }
                {this.state.tabId === 2 && <AddCannabinoids dispensary={this.state.dispensary} cannabinoids={this.state.cannabinoids} cannabinoidConcentrations={this.state.cannabinoidConcentrations} action1={this.handleCannabinoids} action2={this.handleCannabinoidConcentrations} />}
                <br />
                {this.state.tabId === 2 && <Button style={{marginBottom: '1%'}} color='success' onClick={this.incrementTabId.bind(this)} >Next</Button> }
                <br />
                {this.state.tabId === 2 && <Button color='danger' onClick={this.decrementTabId.bind(this)} >Back</Button> }
                {this.state.tabId === 3 && <AddLocation dispensary={this.state.dispensary} locations={this.state.locations} action1={this.handleLocations} />}
                <br />
                {this.state.tabId === 3 && <Button style={{marginBottom: '1%', margintop: '1%'}} color='danger' onClick={this.decrementTabId.bind(this)} >Back</Button> }
                <br />
                {this.state.tabId === 3 && this.state.isManager && <Button style={{marginTop: '1%'}} onClick={this.createProduct}>Create Product</Button>}
                {this.state.tabId === 3 && !this.state.isManager && <Button style={{marginTop: '1%'}} >Manager priveleges required</Button>}
            </React.Fragment>
        )
    }

    render() {
        return(
            <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '80%'}} >
                <h2 style={{textAlign: 'center', marginTop: '5%', marginBottom: '5%'}}>Add New Product to Inventory</h2>
                {this.state.loading === false && this.renderContent()}
            </div>
        )
    }
}