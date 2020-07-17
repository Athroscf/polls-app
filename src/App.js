import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import Polls from './containers/Polls/Polls';
import Stats from './containers/Stats/Stats';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionTypes from './store/actions';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout email={this.props.email}>
          <Switch>
            <Route path="/polls" component={Polls} />
            <Route path="/stats" component={Stats} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    email: state.auth.email
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actionTypes.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
