import React from 'react';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import GamesList from './components/GamesList';
import Map from './components/Map';
import Login from './components/Login';
import RegisterPage from './components/Register';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar> </NavBar>
        <Route path="/map" component={ Map } />
        <Route exact path="/" component={ GamesList } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ RegisterPage } />
      </div>
    )
  }
}
