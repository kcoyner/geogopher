import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../actions';
import { Menu, Button } from 'semantic-ui-react';

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
                  <Menu.Menu position='right'>
                    <Menu.Item>
                     <NavLink exact to="/"> games list </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                     <NavLink to="/map"> map </NavLink>
                    </Menu.Item>
                    <Menu.Item>
                       {user ? (
                         <div>
                         <p>{user.givenName}</p>
                         <Button onClick={this.onLogout}>Logout</Button>
                         </div>
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
