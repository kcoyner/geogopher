import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {

  render() {
    return (
      <div>

        <nav>
            <NavLink exact to="/" > home </NavLink>
            <NavLink to="/map"> map </NavLink>
        </nav>

      </div>

    )
  }
}
