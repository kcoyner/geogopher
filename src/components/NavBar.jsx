import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.onLogoutSuccess = this.onLogoutSuccess.bind(this);
  }

  onLogoutSuccess(){
    console.log('logout successful');
  }

  render() {
    const { user } = this.props;
    return (
      <div className="navbar">
        <nav>
          <NavLink exact to="/"> games list </NavLink>
          <NavLink to="/map"> map </NavLink>
          {user ? (
            <div>
            <p>{user.givenName}</p>
            <GoogleLogout
            buttonText="Logout"
            onLogoutSuccess={this.onLogoutSuccess}
            >
            </GoogleLogout>
            </div>
          ) : (
            <NavLink to="/login"> login </NavLink>
          )}
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.UserReducer.user
  };
}

export default connect(mapStateToProps)(NavBar);
