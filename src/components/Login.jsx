/*
 * Login.jsx
 */
import axios from 'axios';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import { authActions } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.toGoogleLogin = this.toGoogleLogin.bind(this);
  }

  toGoogleLogin() {
    axios.get('/auth/google');
  }

  render() {
    return(
      <div>
        <h1>Login</h1>
        <NavLink exact to="/register"> sign up </NavLink>
        <a href="/auth/google">Sign In with Google</a>
    </div>
    )
  }
}

export default Login;
