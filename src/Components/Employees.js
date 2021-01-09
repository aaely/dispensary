import React, { Component } from 'react'
import { Button, Table, Row, Col } from 'reactstrap'
import loadContract from '../utils/loadContract'
import loadWeb3 from '../utils/loadWeb3'
import loadAccount from '../utils/loadAccount'
import Loader from './Loader'


export default class RegistrationForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            loading: true,
            dispensary: null,
            account: ''
        }
    }

    async componentDidMount() {
        try {
            await loadWeb3()
            const account = await loadAccount()
            const dispensary = await loadContract()
            console.log(dispensary)
            const employeeCount = await dispensary.methods.employeeCount().call()
            for(let i = 1; i <= employeeCount; i++) {
                const employee = await dispensary.methods.employees(i).call()
                this.setState({ employees: [...this.state.employees, employee] })
            }
            this.setState({ dispensary, account, loading: false })
            console.log(this.state)
        } catch(error) {
            console.log(error)
            this.setState({ loading: false })
        }
    }

    renderEmployees() {
        return(
            <React.Fragment>
                <Table striped style={{textAlign:'center', marginLeft: 'auto', marginRight: 'auto'}} >
                    <thead>
                        <tr>
                            <th>
                                First Name
                            </th>
                            <th>
                                Last Name
                            </th>
                            <th>
                                Position
                            </th>
                            <th>
                                Role
                            </th>
                            <th>
                                Active?
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map(employee => {
                            console.log(employee)
                            return(
                                <tr key={employee.id} >
                                    <td>
                                        {employee.firstName}
                                    </td>
                                    <td>
                                        {employee.lastName}
                                    </td>
                                    <td>
                                        {employee.title}
                                    </td>
                                    <td>
                                        {employee.roleId == 1 && 'Admin'}
                                        {employee.roleId == 2 && 'Manager'}
                                        {employee.roleId == 3 && 'Cashier'}
                                    </td>
                                    <td>
                                        {employee.isActive === true && 'Active'}
                                        {employee.isActive === false && 'Inactive'}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </React.Fragment>
        )
    }

    render() {
        return(
            <div>
                {this.state.loading === false && this.renderEmployees()}
                {this.state.loading === true && <Loader />}
            </div>
        )
    }
}