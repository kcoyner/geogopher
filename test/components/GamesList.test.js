/*
 * GamesList.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import GamesList from '../../src/components/GamesList';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('The games list', () => {

  /* These first two tests are essentially the same. The test using
   * createRenderer does a shallow rendering, which means that children of
   * the component will not be rendered.  Use TestUtils instead.
   */

  it('renders GamesList component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<GamesList />, div);
  });

  it('renders a GamesList component', () => {
    const gamesRenderer = createRenderer();
    gamesRenderer.render(<GamesList/>);
    let g = gamesRenderer.getRenderOutput();
    expect(g.type).toBe('div');
  });

});


