/*
 * Signup.test.js
 */

import React from 'react';
import Signup from '../../src/components/Signup';

import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the signup', () => {

  it('renders a Signup component', () => {
    const signupRenderer = createRenderer();
    signupRenderer.render(<Signup/>);
    let s = signupRenderer.getRenderOutput();
    expect(s.type).toBe('div');
  });

});
