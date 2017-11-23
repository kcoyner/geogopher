import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {

  render() {
    return (
      <div>

        <nav>
            <NavLink exact to="/" > games list </NavLink>
            <NavLink to="/map"> map </NavLink>
            <NavLink to="/login"> map </NavLink>
        </nav>

      </div>

    )
  }
}
