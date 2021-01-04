import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import Terpene from '../ProductDetails/Terpene'

export default class AddTerpenes extends Component {

    constructor(props) {
        super(props)
        this.state = {
            terpeneIndex: 0,
            terpenes: [],
            concentration: 0,
            loading: true
        }
    }

    async componentDidMount() {
        try {
            const terpeneCount = await this.props.dispensary.methods.terpeneCount().call()
            for(let i = 1; i <= terpeneCount; i++) {
                const terpene = await this.props.dispensary.methods.terpene(i).call()
                this.setState({ terpenes: [...this.state.terpenes, terpene]})
                console.log(terpene)
            }

            this.setState({ loading: false })
            console.log(this.state)
        } catch(error) {
            this.setState({ loading: false })
            console.log(error)
        }
    }

    addTerpene = () => {
        let terpenes = this.props.terpenes
        let index = terpenes.findIndex(x => x === this.state.terpenes[this.state.terpeneIndex].id)
        if(index < 0) {   
            this.props.action1(this.state.terpenes[this.state.terpeneIndex].id)
            this.props.action2(this.state.concentration)
        }
        if(index >= 0) {
            window.alert('Item already added')
        }
    }

    handleIndex = async (event) => {
        let index = this.state.terpenes.filter(prop => {
            return prop.name.includes(`${event.target.value}`)
        })
        await this.setState({
            terpeneIndex: parseInt(index[0].id) - 1
        })
    }

    handleConcentration = (event) => {
        this.setState({
            concentration: event.target.value
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='terpeneConcentration' id='terpeneConcentration'>Terpene Concentration</Label>
                    <Input type='number' name='terpeneConcentration' id='terpeneConcentration' onChange={this.handleConcentration} />
                </FormGroup>
                <FormGroup>
                    <Label name='terpene' id='terpene'>Terpene</Label>
                    <Input type='select' name='terpene' id='terpene' onChange={this.handleIndex}>
                        {this.state.terpenes.map((terpene) => {
                            return(
                                <option key={terpene.id}>{terpene.name}</option>
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
                {this.state.terpenes.length > 0 && this.state.loading === false && 
                <Terpene 
                terpeneIndex={this.state.terpeneIndex} 
                terpene={this.state.terpenes[this.state.terpeneIndex]} 
                />}
                {this.state.loading === false && this.state.terpenes.length > 0 && this.renderForm()}
                <Button color='success' style={{float: 'right', marginRight: '10%'}} onClick={this.addTerpene.bind(this)} >Add Terpene</Button>
            </React.Fragment>
        )
    }
}