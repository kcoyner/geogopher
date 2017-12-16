import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Checkbox,
  Modal,
  Dropdown } from 'semantic-ui-react';
import {
  setGameTypeID,
  setGameDifficultyID,
  setTimer,
} from '../actions/Score.actions'
import { setGameType, setGameDifficulty } from '../actions/Game.actions'
import { manipulateTimer } from '../utils/manipulateTimer'

@connect((state) => {
  return {
    gameTypes: state.GamesListReducer.gameTypes,
    gameDifficulties: state.GamesListReducer.gameDifficulties,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
  }
})


class GameSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTypeChoices: null,
      gameDifficultyChoices: null,
      gameTypeDescription: null,
    };
    this.getDescription = this.getDescription.bind(this);
    this.handleDifficultySettings = this.handleDifficultySettings.bind(this);
  }

  componentDidMount() {
    let gameTypeChoices = this.props.gameTypes.map((el)=>{
      let obj = {};
      obj.text = el.game_type_name;
      obj.value = el.game_type_id;
      return obj
    })

    this.setState({gameTypeChoices: gameTypeChoices});
  }

  getDescription(e, {value}) {
    this.props.gameTypes.forEach((el) => {
      if (el.game_type_id === value) {
        this.setState({gameTypeDescription: el.game_type_description});
        //dispatch gameTypeID to scores
        this.props.dispatch(setGameTypeID(el.game_type_id))
        this.props.dispatch(setGameType(el.game_type_name))
      }
    });
  }

  handleDifficultySettings(value) {
    //set gameTimerRemaining, gameTimerStart, gameDifficultyID
    this.props.gameDifficulties.forEach((el) => {
      if(el.game_difficulty_name === value) {
        this.props.dispatch(setGameDifficultyID(el.game_difficulty_id))
        let timeManipulation = JSON.parse(el.game_time_manipulation)


          this.props.dispatch(setTimer(manipulateTimer(timeManipulation, this.props.gameTimerStart)))

        this.props.dispatch(setGameDifficulty(el.game_difficulty_name))
      }
    });



  }
    render() {
        return(
            <Modal
            open={this.props.open}
            closeOnRootNodeClick={false}>
                <Modal.Header>GAME SETTINGS</Modal.Header>
                <Modal.Content>
                <Modal.Description className="game-settings">
                    <div className="game-type-title">
                      <h2>Select the type of game you want to play</h2>
                    </div>
                    <Dropdown className="game-type-dropdown" placeholder='Select Game Type' fluid selection options={this.state.gameTypeChoices} onChange={this.getDescription} />
                    <div className="setting-description">
                      <h3>{this.state.gameTypeDescription}</h3>
                    </div>
                    <div className="game-difficulty-title">
                      <h2>Select a difficulty or play on a fixed time limit</h2>
                    </div>
                      <Button.Group className="game-difficulty-setting">
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[0].game_difficulty_name)} color='green'>Easy</Button>
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[1].game_difficulty_name)} color='grey'>Medium</Button>
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[2].game_difficulty_name)} color='red'>Hard</Button>
                        <Button.Or />
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[3].game_difficulty_name)} color='blue'>1 min</Button>
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[4].game_difficulty_name)} color='blue'>3 min</Button>
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[5].game_difficulty_name)} color='blue'>5 min</Button>
                        <Button onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[6].game_difficulty_name)} color='blue'>10 min</Button>
                      </Button.Group>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onClose} negative>Go Back</Button>
                    <Button onClick={this.props.onContinue} positive>Continue</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameSettings);
