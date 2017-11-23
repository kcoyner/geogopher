/*
 * GamesList.test.js
 */

import React from 'react';
import ReactDOM from 'react-dom';
import GamesList from '../../src/components/GamesList';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

it('renders GamesList component', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GamesList />, div);
});

