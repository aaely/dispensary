import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'
import Cannabinoid from '../ProductDetails/Cannabinoid'
import loadWeb3 from '../../utils/loadWeb3'

export default class AddCannabinoids extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            cannabinoidIndex: 0,
            cannabinoids: [],
            cannabinoidConcentration: 0
        }
    }

    async componentDidMount() {
        try {
            const cannabinoidCount = await this.props.dispensary.methods.cannabinoidCount().call()
            for(let i = 1; i <= cannabinoidCount; i++) {
                const cannabinoid = await this.props.dispensary.methods.cannabinoid(i).call()
                this.setState({ cannabinoids: [...this.state.cannabinoids, cannabinoid]})
            }
            this.setState({ loading: false })
            console.log(this.state)
        } catch(error) {
            console.log(error)
            this.setState({loading: false})
        }
    }

    addCannabinoid = () => {
        let cannabinoids = this.props.cannabinoids
        let index = cannabinoids.findIndex(x => x === this.state.cannabinoids[this.state.cannabinoidIndex].id)
        if(index < 0) {
            this.props.action1(this.state.cannabinoids[this.state.cannabinoidIndex].id)
            this.props.action2(this.state.concentration)
        }
        if(index >= 0) {
            window.alert('Item already added')
        }
    }

    handleConcentration = (event) => {
        this.setState({
            concentration: event.target.value
        })
    }

    handleIndex = async (event) => {
        let index = this.state.cannabinoids.filter(prop => {
            return prop.name.includes(`${event.target.value}`)
        })
        await this.setState({
            cannabinoidIndex: parseInt(index[0].id - 1)
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='terpeneConcentration' id='terpeneConcentration'>Cannabinoid Concentration</Label>
                    <Input type='number' name='terpeneConcentration' id='terpeneConcentration' onChange={this.handleConcentration} />
                </FormGroup>
                <FormGroup>
                    <Label name='terpene' id='terpene'>Cannabinoid</Label>
                    <Input type='select' name='terpene' id='terpene' onChange={this.handleIndex}>
                        {this.state.cannabinoids.map((cannabinoid) => {
                            return(
                                <option key={cannabinoid.id} >{cannabinoid.name}</option>
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
                {this.state.cannabinoids.length > 0 && this.state.loading === false && <Cannabinoid cannabinoidIndex={this.state.cannabinoidIndex} cannabinoid={this.state.cannabinoids[this.state.cannabinoidIndex]} />}
                {this.state.cannabinoids.length > 0 && this.state.loading === false && this.renderForm()}
                <Button style={{float: 'right', marginRight: '10%'}} color='success' onClick={this.addCannabinoid.bind(this)} >Add Cannabinoid</Button>
            </React.Fragment>
        )
    }
}