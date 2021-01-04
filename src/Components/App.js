import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import Dashboard from './Dashboard'
import Landing from './Landing'
import Loader from './Loader'
import ProductDetails from './ProductDetails/ProductDetails'
import Products from './Products'
import Checkout from './Checkout'
import AddProductRoot from './AddProduct/AddProductRoot'
import CreateLocation from './CreateLocation'
import CreateTerpene from './CreateTerpene'
import CreateCannabinoid from './CreateCannabinoid'
import Purchases from './Purchases'
import RegistrationForm from './RegistrationForm'
import MyNavbar from './MyNavbar'


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <MyNavbar />
        <Switch>
          <Route component={Landing} exact path="/" />
          <Route component={Dashboard} path="/Dashboard" />
          <Route component={Loader} path="/loader" />
          <Route component={ProductDetails} path="/product/:productId" />
          <Route component={Products} path="/products" />    
          <Route component={Checkout} path="/checkout" />
          <Route component={AddProductRoot} path="/addproduct" />
          <Route component={CreateLocation} path="/addlocation" />
          <Route component={CreateCannabinoid} path="/addcannabinoid" />
          <Route component={CreateTerpene} path="/addterpene" />
          <Route component={Purchases} path="/mypurchases" />
          <Route component={RegistrationForm} path="/registercustomer" />
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
