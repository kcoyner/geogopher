import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';

class Container extends React.Component {
    render() {
      return (
        <div>
            <ul>
              <li>
                <Link to={'/'}>Home</Link>
              </li>
              <li>
                <Link to={'/map'}>Map</Link>
              </li>
            </ul>
            <h2>App Container</h2>
            <main>
                {renderRoutes(this.props.route.routes)}
            </main>
        </div>
      );
    }
  }
  
  export default Container;