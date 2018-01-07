import React from 'react';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import GamesList from './components/GamesList';
import Map from './components/Map';
import Login from './components/Login';
import RegisterPage from './components/Register';
import HighScores from './components/HighScores';
import Explore from './components/Explore';

export default class App extends React.Component {

  render() {
    return (
      <div>
        <NavBar> </NavBar>
        <Route exact path="/" component={ GamesList } />
        <Route path="/map" component={ Map } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/high-scores/:gameId?/:gameTypeId?/:gameDiffId?/" component={ HighScores } />
      </div>
    )
  }
}
