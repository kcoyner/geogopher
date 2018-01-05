/*
 * Signup.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../src/store';
import RegisterPage from '../../src/components/Register';
const moment = require('moment');
const db = require('../../db/config');
const User = db.users;

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

// const date = moment();
// let vanillaUser = {
//   'first_name': 'Marilyn',
//   'last_name': 'Monroe',
//   'email': 'marilyn.monroe@mail.com',
//   'count_games_played': 0,
//   'last_login': date,
//   'password_hash': 'bacon',
//   'username': 'marilynmonroe'
// }
// let newUser;

// describe('User creation', () => {
//   beforeAll(done => {
//     User.create(vanillaUser)
//     .then(user => {
//       newUser = user;
//       done();
//     })
//   })
  
//   test('A hash should be generated when a user registers', () => {
//     expect(newUser.password_hash).toBeDefined();
//   })

//   test('A new users password hash should not be equal to their password', () => {
//     expect(vanillaUser.password_hash).not.toMatch(newUser.password_hash);
//   })

//   test('User should not be able to sign up more than once', () => {
//     expect.assertions(1);
//     return User.create(vanillaUser)
//     .catch(e => {
//       console.log(e);
//       expect(e).toMatch('error')
//     })
//   })

// })



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