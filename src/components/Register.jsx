/*
 * Register.jsx
 */

import React from 'react';
import { Button, Checkbox, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        email: '',
      },
      error: false,
      errorMessage: null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
        user: {
            ...user,
            [name]: value
        }
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.username && user.password && user.email) {
        dispatch(await userActions.register(user))
          .then(data => {
            if(data){
              this.setState({
                error: true,
                errorMessage: data
              })
            } else {
              this.props.history.push('/');
            }
          })
          .catch(err => {
            console.log(err);
            this.setState({
              error: true,
              errorMessage: err
            })
          })
    }
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
          <Form onChange={this.handleChange} onSubmit={this.handleSubmit} >
            <Form.Field required>
              <label>First Name</label>
              <input name='firstName' placeholder='First Name' required='true'/>
            </Form.Field>
            <Form.Field required>
              <label>Last Name</label>
              <input name='lastName' placeholder='Last Name' required='true'/>
            </Form.Field>
            <Form.Field required> 
              <label>Email</label>
              <input name='email' placeholder='Email' type='email' required='true'/>
            </Form.Field>
            <Form.Field required>
              <label>Password</label>
              <input name='password' placeholder='Password' type='password'required='true'/>
            </Form.Field>
            <Form.Field required>
              <label>Username</label>
              <input name='username' placeholder='Username' required='true'/>
            </Form.Field>
            <Button type='submit'>Submit</Button>
        </Form>
        { this.state.error &&
        <Message
        error
        header='Oops! There seems to be a problem'
        content={this.state.errorMessage}
      />
      }
        
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      registering: state.UserReducer.registering,
      registeredUser: state.UserReducer.registeredUser
  };
}

export default connect(mapStateToProps)(RegisterPage);
