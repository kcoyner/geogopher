/*
 * NavBar.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../../src/components/NavBar';
import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the map', () => {

  /* These first two tests are essentially the same. The test using
   * createRenderer does a shallow rendering, which means that children of
   * the component will not be rendered.  Use TestUtils instead.
   */

  it('renders NavBar component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<navbar />, div);
  });

  it('renders a NavBar component', () => {
    const navBarRenderer = createRenderer();
    navBarRenderer.render(<NavBar/>);
    let n = navBarRenderer.getRenderOutput();
    expect(n.type).toBe('div');
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

});
