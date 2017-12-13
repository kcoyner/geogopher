/*
 * Login.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../src/store';
import Login from '../../src/components/Login';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the login', () => {

  it('renders Map div', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={ store }>
        <login />
      </Provider>, div);
  });

  it('register link matches snapshot', () => {
    const context = {}
    const tree = require('react-test-renderer').create(
      <StaticRouter location="http://localhost:1337/register" context={context}>
        <Link to="/register" />
      </StaticRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
