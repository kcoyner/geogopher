/*
 * Login.jsx
 */
import axios from 'axios';
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import {withRouter} from "react-router-dom";

import { userActions } from '../actions';
import { GoogleLogin } from 'react-google-login';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailure = this.onLoginFailure.bind(this);
  }

  onLoginSuccess(response) {
    const { dispatch } = this.props;
    console.log('success: ', response);
    dispatch(userActions.login(response));
    if(this.props.userGameSelected) {
      // route to correct game link
      this.props.history.push('/map');
    } else {
      this.props.history.push('/');
    }
    
  }
  onLoginFailure(response) {
    console.log('failure: ', response);
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <Link to="/register"> sign up </Link>
        <GoogleLogin
        clientId="884185427931-gi7dgev6mm5buttbcqpenvc3h38a9oel.apps.googleusercontent.com"
        buttonText="Sign up or Login w/ Google"
        onSuccess={this.onLoginSuccess}
        onFailure={this.onLoginFailure}
        />
    </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    userGameSelected: state.UserReducer.userGameSelected
  };
}

export default withRouter(connect(mapStateToProps)(Login));

