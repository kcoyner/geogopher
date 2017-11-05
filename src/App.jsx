import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from './store'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>GEOGOPHER</h1>
      </div>
    );
  }
}

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('app'));
