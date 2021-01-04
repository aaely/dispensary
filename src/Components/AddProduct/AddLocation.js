import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap'

export default class AddLocation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            loading: true,
            locationIndex: 0
        }
    }

    async componentDidMount() {
        try {
            const locationCount = await this.props.dispensary.methods.locationCount().call()
            for(let i = 1; i <= locationCount; i++) {
                const location = await this.props.dispensary.methods.location(i).call()
                this.setState({ locations: [...this.state.locations, location]})
            }
            this.setState({ loading: false })
            console.log(this.state)
        } catch(error) {
            console.log(error)
            this.setState({loading: false})
        }
    }

    addLocation = () => {
        let locations = this.props.locations
        let index = locations.findIndex(x => x === this.state.locations[this.state.locationIndex].id)
        if(index < 0) {   
            this.props.action1(this.state.locations[this.state.locationIndex].id)
        }
        if(index >= 0) {
            window.alert('Item already added')
        }
    }

    handleLocation = (event) => {
        let location = this.state.locations.filter(prop => {
            return prop.nickname.includes(`${event.target.value}`)
        })
        console.log(location[0].id)
    }

    handleIndex = async (event) => {
        let index = this.state.locations.filter(prop => {
            return prop.nickname.includes(`${event.target.value}`)
        })
        await this.setState({
            locationIndex: parseInt(index[0].id - 1)
        })
    }

    renderForm() {
        return(
            <Form>
                <FormGroup>
                    <Label name='location' id='location'>Product Type</Label>
                    <Input type='select' name='location' id='location' onChange={this.handleIndex} >
                        {this.state.locations.map(location => {
                            return(
                            <option key={location.id} >{location.nickname}</option>
                            )
                        })}
                    </Input>
                    <Button color='success' onClick={this.addLocation.bind(this)}>Add Location</Button>
                </FormGroup>
            </Form>
        )
    }

    render() {
        return(
            <React.Fragment>
                {this.state.loading === false && this.state.locations.length > 0 && this.renderForm()}
            </React.Fragment>
        )
    }
}