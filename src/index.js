import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import App from './App';

ReactDOM.render(<Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>, document.getElementById('app'));
