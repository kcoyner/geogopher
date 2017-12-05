/*
 * src/components/GamesList.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import { fetchGamesList } from '../actions/GamesList.actions';

@connect((store) => {
  return {
    games: store.GamesListReducer.availableGames
  }
})

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(fetchGamesList());
  }

  render() {
    const {games} = this.props;
    return (
      <div>
        <h1>Games List</h1>
        <table className="table">
          <tbody>
            <tr>
              <td>
                { games.map((game, index) => (
                    <div key={ index }>
                      { game.game_name }
                    </div>
                  )) }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      );
  }
}

export default GamesList;
