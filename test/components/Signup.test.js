/*
 * Signup.test.js
 */

import React from 'react';
import RegisterPage from '../../src/components/Register';

import renderer from 'react-test-renderer';
import { Link } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { createRenderer } from 'react-test-renderer/shallow';

global.requestAnimationFrme = function(callback) {
  setTimeout(callback, 0);
};

describe('the register', () => {

  it('renders a Register component', () => {
    const signupRenderer = createRenderer();
    signupRenderer.render(<RegisterPage/>);
    let s = signupRenderer.getRenderOutput();
    expect(s.type).toBe('div');
  });

});
