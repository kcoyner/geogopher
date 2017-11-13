import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store'
import Map from './Components/Map';

let map;

export default class App extends React.Component {

  render() {
    return (
      <div>
        <Map></Map>
      </div>
    )
  }
}