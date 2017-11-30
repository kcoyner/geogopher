import { Input } from 'semantic-ui-react';
import React from 'react';

const Signup = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <Input placeholder='Email' />
      <Input placeholder='Password' />
      <Input placeholder='Confirm Your Password' />
    </div>
  );
};

export default Signup;
