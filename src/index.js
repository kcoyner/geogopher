import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import 'core-js/es6/map';
import 'core-js/es6/set';

import App from './App';

if(localStorage.user) {
  const currentUser = JSON.parse(localStorage.user);
  store.dispatch({ type: 'LOGIN_SUCCESS', payload: currentUser });
}

ReactDOM.render(<Provider store={ store }>
  <Router>
    <App />
  </Router>
</Provider>, document.getElementById('app'));
