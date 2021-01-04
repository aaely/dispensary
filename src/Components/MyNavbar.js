import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap'

  export default class MyNavbar extends Component {

    constructor(props) {
        super(props);
        this.toggleNavbar = this.toggleNavbar.bind(this)
        this.state = {
            isOpen: false
        }
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return(
            <Navbar color='dark' light expand='xl' >
                <NavbarBrand style={{color: 'rgb(0, 255, 34)'}} className='mr-auto' href="/dashboard">Company Name
                        
                </NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    <NavLink href="/products" style={{color: 'rgb(0, 255, 34)'}} >Products</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/mypurchases" style={{color: 'rgb(0, 255, 34)'}} >My Purchases</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="/addproduct" style={{color: 'rgb(0, 255, 34)'}} >Add New Product</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
            </Navbar>
        )
    }
  }