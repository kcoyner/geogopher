import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import routes from './routes';

import store from './store'
import Map from './Components/Map';

let map;

export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </Provider>
    )
  }
}