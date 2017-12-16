/*
 * src/components/GamesList.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import { Card, Image } from 'semantic-ui-react';
import { selectGame, userActions, setScoreIDs, fetchGamesList, fetchGameSettings, setTimer } from '../actions/index'

//pull in img no clue why it needs to be in this format.
const placeholderImg = require('-!file-loader?name=placeholderImg!../assets/games-list-placeholder.png');

@connect((state, ownProps) => {
  return {
    //take out of redux
    games: state.GamesListReducer.availableGames,
    user: state.UserReducer.user
  }
})

class GamesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.onGameSelect = this.onGameSelect.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(fetchGamesList());
    //get game settings options queued up
    this.props.dispatch(fetchGameSettings());
  }

  onGameSelect(gameSelected) {
    // if(this.props.user) {
      //dispatch game selection over to map
      this.props.dispatch(selectGame(this.props.games[gameSelected]));
      //set score with settings chosen this far
      this.props.dispatch(setScoreIDs(this.props.games[gameSelected]))
      //set base time before modifications in settings are made
      this.props.dispatch(setTimer(this.props.games[gameSelected].base_time))



      this.props.history.push('/map');
      // map to correct game based on game index
    // } else {
      // this.props.history.push('/login');
    // }

  }

  render() {
    const {games} = this.props;
    return (
      <div>
        <h1>Games List</h1>


        <div className="games-list">

            { games.map((game, index) => (
              <Card key={ index}>
                <Image src={placeholderImg} />
                <Card.Content>
                  <Card.Header>
                    {game.game_name}
                  </Card.Header>
                  <Card.Description>
                    Game description here
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div>
                    <Button onClick={() => this.onGameSelect(index)} basic>Play game</Button>
                  </div>
                </Card.Content>
              </Card>

            )
          ) }

      </div>


    </div>
      );
  }
}

export default GamesList;
