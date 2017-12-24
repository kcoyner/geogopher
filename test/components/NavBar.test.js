/**
 * NavBar.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../src/store';
import NavBar from '../../src/components/NavBar';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the map', () => {

  it('renders NavBar component', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store = { store }>
      <navbar />
      </Provider>, div);
  });

  it('home link matches snapshot', () => {
    const context = {}
    const tree = require('react-test-renderer').create(
      <StaticRouter location="http://localhost:1337/" context={context}>
        <Link to="/" />
      </StaticRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('map link matches snapshot', () => {
    const context = {}
    const tree = require('react-test-renderer').create(
      <StaticRouter location="http://localhost:1337/map" context={context}>
        <Link to="/map" />
      </StaticRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

  // When a user logs out, there shouldn't be a user object within localStorage

});
