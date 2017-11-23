/*
 * Map.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../../src/components/Map';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the map', () => {

  /* These first two tests are essentially the same. The test using
   * createRenderer does a shallow rendering, which means that children of
   * the component will not be rendered.  Use TestUtils instead.
   */

  it('renders Map div', () => {
    const div = document.createElement('div');
    ReactDOM.render(<maps />, div);
  });

  it('renders a Map component', () => {
    const mapRenderer = createRenderer();
    mapRenderer.render(<Map/>);
    let m = mapRenderer.getRenderOutput();
    expect(m.type).toBe('div');
  });

  it('has title Geogophers', () => {
    expect.stringContaining('Geogophers');
  });

});

