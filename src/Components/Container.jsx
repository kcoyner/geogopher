import React from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import Map from './Map';

class Container extends React.Component {
    render() {
      return (
        <main>
            <Route exact path="/" component={ Home }/>
            <Route path="/map" component={ Map }/>
        </main>
      );
    }
  }
  
  export default Container;