import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
<<<<<<< 6d491b92b0ded047ff539dfb56428104fbbbaa65

import { Menu, Image, Button } from 'semantic-ui-react';
=======
import { Menu, Image, Dropdown } from 'semantic-ui-react';
>>>>>>> these changes fix a error i introduced in a failed attempt at refactoring login for future component reuse. they also introducea dropdown menu in the map view, which helps keep the game screen as clean as possible

const geogopherLogo = require('-!url-loader?name=geogopher-logo!../assets/geogopher-logo.svg');


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ''
    }

    this.onLogout = this.onLogout.bind(this);
  }

  async onLogout(){
    const { dispatch } = this.props;
    dispatch(await userActions.logout())
    .then(user => {
      if(!user) {
        console.log("logout successful!");
        this.props.history.push('/login');
      } else {
        console.log("there was a problem logging out");
      }
    });
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { user } = this.props;
    return (
      <div className="navbar">
        <nav>
                <Menu>

                  <Menu.Menu position='left'>
                      <Image className='geogopher-navbar-logo' src={geogopherLogo}/>
                  </Menu.Menu>
                  <Menu.Menu position='right'>
                    <Menu.Item>
                     <NavLink exact to="/"> PLAY </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                     <NavLink to="/"> EXPLORE </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                     <NavLink to="/"> SCORES </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                       {user ? (

                         <Dropdown text={user.givenName} pointing className='user-account-menu-dropdown'>
                          <Dropdown.Menu>
                            <Dropdown.Header>Account</Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                              <GoogleLogout
                              buttonText="Logout"
                              onClick={this.onLogout}
                              >
                              </GoogleLogout>
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                       ) : (
                         <NavLink to="/login"> login </NavLink>
                       )}
                    </Menu.Item>
                  </Menu.Menu>
                </Menu>

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

export default withRouter(connect(mapStateToProps)(NavBar));
