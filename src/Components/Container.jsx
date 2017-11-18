import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Map from './Map';

class Container extends React.Component {
    render() {
      return (
        <main>
          <Route path="/map" component={Map}/>
          <Route exact path="/" component={Home}/>
        </main>
      );
    }
  }
  
  export default Container;