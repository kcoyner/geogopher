import React from 'react';
import NavBar from './components/NavBar';
import { NavLink, Route } from 'react-router-dom';
import GamesList from './components/GamesList';
import Map from './components/Map';

export default class App extends React.Component {

  render() {
    return (
      <div>

        <NavBar> </NavBar>

        <Route path="/map" component={Map}/>
        <Route exact path="/" component={GamesList}/>

      </div>
    )
  }
}
