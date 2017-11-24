/*
 * Login.test.js
 */

import React from 'react';
import Login from '../../src/components/Login';

import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the login', () => {

  it('renders a Login component', () => {
    const loginRenderer = createRenderer();
    loginRenderer.render(<Login/>);
    let l = loginRenderer.getRenderOutput();
    expect(l.type).toBe('div');
  });

  it('signup link matches snapshot', () => {
    const context = {}
    const tree = require('react-test-renderer').create(
      <StaticRouter location="http://localhost:1337/signup" context={context}>
        <Link to="/signup" />
      </StaticRouter>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });


});
