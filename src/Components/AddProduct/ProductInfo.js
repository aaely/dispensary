import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

export default class ProductInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            loading: true
        }
    }

    async componentDidMount() {
        try{
            console.log(this.props)
            const categoryCount = await this.props.dispensary.methods.categoryCount().call()
            for(let i = 1; i <= categoryCount; i++) {
                const category = await this.props.dispensary.methods.category(i).call()
                this.setState({ categories: [...this.state.categories, category]})
            }
            console.log(this.state)
            this.setState({ loading: false })
        } catch(error) {
            console.log(error)
            this.setState({
                loading: false
            })
        }
    }

    addProductInfo = () => {

    }

    handleCategory = (event) => {
        let id = this.state.categories.filter(prop => {
            return prop.name.includes(`${event.target.value}`)
        })
        this.props.action2(id[0].id)
    }

    handleChange = (event) => {
        this.props.action1(event.target.value)
    }

    handleChange2 = (event) => {
        this.props.action3(event.target.value)
    }

    handleChange3 = (event) => {
        this.props.action4(event.target.value)
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='name' id='name'>Name of Strain</Label>
                    <Input type='text' name='name' id='name' onChange={this.handleChange} value={this.props.name} />
                </FormGroup>
                <FormGroup>
                    <Label name='cost' id='cost'>Cost Per Gram</Label>
                    <Input type='number' name='cost' id='cost' onChange={this.handleChange2} value={this.props.cost} />
                </FormGroup>
                <FormGroup>
                    <Label name='quantity' id='quantity'>Grams Available</Label>
                    <Input type='number' name='quantity' id='quantity' onChange={this.handleChange3} value={this.props.quantity} />
                </FormGroup>
                <FormGroup>
                    <Label name='category' id='category'>Product Category</Label>
                    <Input type='select' name='category' id='category' onChange={this.handleCategory} >
                        {this.state.categories.map(category => {
                            return(
                                <option key={category.id} >{category.name}</option>
                            )
                        })}
                    </Input>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <React.Fragment>
                {this.state.loading === false && this.state.categories.length > 0 && this.renderForm()}
            </React.Fragment>
        )
    }
}