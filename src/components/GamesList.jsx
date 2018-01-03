/*
 * src/components/GamesList.jsx
 */

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'semantic-ui-react';
import { Card, Image } from 'semantic-ui-react';
import { selectGame, userActions, setScoreIDs, fetchGamesList, fetchGameSettings, setTimer, setBaseTime } from '../actions/index'
import { Motion, spring } from 'react-motion';

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
      count: 0,

    };
    this.onGameSelect = this.onGameSelect.bind(this);

  }

  componentDidMount() {
    this.props.dispatch(fetchGamesList());
    //get game settings options queued up
    this.props.dispatch(fetchGameSettings());
  }


  onGameSelect(gameSelected) {
      //dispatch game selection over to map
      this.props.dispatch(selectGame(this.props.games[gameSelected]));
      //set score with settings chosen this far
      this.props.dispatch(setScoreIDs(this.props.games[gameSelected]))
      //set base time before modifications in settings are made
      this.props.dispatch(setBaseTime(this.props.games[gameSelected].base_time))
      // check to see if a user has logged in already
      if(this.props.user) {
        // If a user exists, map the user to the game screen
        this.props.history.push('/map');
      } else {
        // Otherwise, send them to login
      this.props.history.push('/login');
      }
    }




  render() {
    const {games} = this.props;

    return (


      <div className="home-page-container">

        <div className="gap"></div>

        <div className="splash">
          <h1>PLAY</h1>
        </div>


        <div className="countries-title">
          <h1>Countries</h1>
          <h3>Choose a region to begin</h3>
        </div>


        <div className="countries-list">


            {
              games.map(

                (game, index) => (

                  game.game_name.indexOf("Countries") > -1 ?

                  <Card key={index} >
                    {/* on hover, this div covers the thumb */}
                    <div className="select-this-game"
                      onClick={() => this.onGameSelect(index)}>
                      <h1>PLAY</h1>
                    </div>
                    <Image src={game.img_asset}
                          onClick={() => this.onGameSelect(index)}
                        />
                    <Card.Content
                      onClick={() => this.onGameSelect(index)}
                      >
                      <Card.Header>
                        {game.game_name}
                      </Card.Header>
                      <Card.Description>
                        {game.game_description}
                      </Card.Description>
                    </Card.Content>

                  </Card>

                  :
                  null

              )
            )
          }

      </div>

        <div className="capitals-title">
          <h1>Capitals</h1>
          <h3>Choose a region to begin</h3>
        </div>

        <div className="capitals-list">


            {
              games.map(

                (game, index) => (

                  game.game_name.indexOf("Capitals") > -1 ?

                  <Card key={index} >
                    {/* on hover, this div covers the thumb */}
                    <div className="select-this-game"
                      onClick={() => this.onGameSelect(index)}>
                      <h1>PLAY</h1>
                    </div>
                    <Image src={game.img_asset}
                          onClick={() => this.onGameSelect(index)}
                        />
                    <Card.Content
                      onClick={() => this.onGameSelect(index)}
                      >
                      <Card.Header>
                        {game.game_name}
                      </Card.Header>
                      <Card.Description>
                        {game.game_description}
                      </Card.Description>
                    </Card.Content>

                  </Card>
                  :
                null
              )
            )
          }

      </div>



    </div>
      );
  }
}

export default GamesList;
