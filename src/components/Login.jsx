/*
 * Login.jsx
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <NavLink exact to="/register"> sign up </NavLink>
      { /* Login stuff here */ }
    </div>
  );
};

export default Login;
