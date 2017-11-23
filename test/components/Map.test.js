/*
 * Map.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../../src/components/Map';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the map', () => {
  it('renders Map div', () => {
    const div = document.createElement('div');
    ReactDOM.render(<maps />, div);
  });

  it('has title Geogophers', () => {
    expect.stringContaining('Geogophers');
  });
});

