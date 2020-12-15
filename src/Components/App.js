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
import ProductDetails from './ProductDetails'
import Products from './Products'


class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <Switch>
          <Route component={Landing} exact path="/" />
          <Route component={Dashboard} path="/Dashboard" />
          <Route component={Loader} path="/loader" />
          <Route component={ProductDetails} path="/product/:productId" />
          <Route component={Products} path="/products" />         
        </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
