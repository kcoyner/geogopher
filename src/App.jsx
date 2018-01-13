import React from 'react';
import NavBar from './components/NavBar';
import { Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import GamesList from './components/GamesList';
import Login from './components/Login';
import RegisterPage from './components/Register';
import HighScores from './components/HighScores';

const Loading = () => <div className='loader'></div>;

const Home = Loadable({
  loader: () => import('./components/Home'),
  loading: Loading,
});

const Map = Loadable({
  loader: () => import('./components/Map'),
  loading: Loading,
});

const Explore = Loadable({
  loader: () => import('./components/Explore'),
  loading: Loading,
});

export default class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar> </NavBar>
        <Route exact path="/" component={ GamesList } />
        <Route exact path="/home" component={ Home } />
        <Route path="/map" component={ Map } />
        <Route exact path="/login" component={ Login } />
        <Route exact path="/register" component={ RegisterPage } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/high-scores/:gameId?/:gameTypeId?/:gameDiffId?/" component={ HighScores } />
      </div>
    )
  }
}
