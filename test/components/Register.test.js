/*
 * Signup.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../src/store';
import RegisterPage from '../../src/components/Register';


global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the register', () => {

  it('renders Register component', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={ store }>
        <RegisterPage />
      </Provider>, div);
  });

  // Previously registered user cannot register more than once
    // unique email, username

  // After registering, the user must have a first_name, last_name, user_id OR google_id, email, and username

});