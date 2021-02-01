import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import LandingPage from './containers/LandingPage/LandingPage';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Signout from './containers/Auth/Signout/Signout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

class App extends Component {
  componentDidMount() {
    this.props.onAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/burger-builder" component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={LandingPage} />
        <Redirect to="/burger-builder" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/burger-builder" component={BurgerBuilder} />
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/signout" component={Signout} />
          <Route path="/" component={LandingPage} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchActions = dispatch => {
  return {
    onAutoSignup: () => dispatch(actions.authCheckState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchActions)(App));
