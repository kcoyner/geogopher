import React from 'react';
import Container from './components/Container';
import NavBar from './components/NavBar';
import { NavLink } from 'react-router-dom';

export default class App extends React.Component {

  render() {
    return (
      <div>

        <NavBar> </NavBar>

        <Container></Container>
      </div>
    )
  }
}
