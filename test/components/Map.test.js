/*
 * Map.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Map from '../../src/components/Map';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

it('renders Map component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<maps />, div);
});

