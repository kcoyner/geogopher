import React from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends React.Component {

  render() {
    return (
      <div className="navbar">
        <nav>
          <NavLink exact to="/"> games list </NavLink>
          <NavLink to="/map"> map </NavLink>
          <NavLink to="/login"> login </NavLink>
        </nav>
      </div>
    )
  }
}
