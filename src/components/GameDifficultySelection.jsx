import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Checkbox,
  Modal,
  Dropdown,
  Step,
  Segment,
  Card } from 'semantic-ui-react';
import {
  setGameTypeID,
  setGameDifficultyID,
  setTimer,
} from '../actions/Score.actions'
import { setGameType, setGameDifficulty } from '../actions/Game.actions'
import { manipulateTimer } from '../utils/manipulateTimer'
import { formatSecondsToMMSS } from '../utils/formatTime'

@connect((state) => {
  return {
    gameTypes: state.GamesListReducer.gameTypes,
    gameTypeSelected: state.GameReducer.gameTypeSelected,
    gameDifficulties: state.GamesListReducer.gameDifficulties,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
    baseTime: state.GameReducer.baseTime,
    gameSelected: state.GameReducer.gameSelected,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
  }
})


class GameDifficultySelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTypeChoices: null,
      gameDifficultyChoices: null,
      gameTypeDescription: null,
      calculatedTime: '00:00',
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
          this.props.dispatch(
            setTimer(
              manipulateTimer(timeManipulation, this.props.baseTime)
            )
          )
         this.props.dispatch(setGameDifficulty(el.game_difficulty_name))
       }
    });

    let displayTime = formatSecondsToMMSS(this.props.gameTimerStart)
    console.log(displayTime)
    this.setState({calculatedTime: displayTime})
  }

    render() {
        return(
            <Modal
            open={this.props.open}
            closeOnRootNodeClick={false}>
              <Step.Group ordered attached='top'>
                <Step completed>
                  <Step.Content>
                    <Step.Title>Game Name</Step.Title>
                    <Step.Description>{this.props.gameTypeSelected  || "Choose a game type"}</Step.Description>
                  </Step.Content>
                </Step>

                <Step active>
                  <Step.Content >
                    <Step.Title>Difficulty</Step.Title>
                    <Step.Description>Choose difficulty settings</Step.Description>
                  </Step.Content>
                </Step>

                <Step >
                  <Step.Content>
                    <Step.Title>Play</Step.Title>
                    <Step.Description>Start to play</Step.Description>
                  </Step.Content>
                </Step>
              </Step.Group>
                <Modal.Content>
                <Modal.Description className="game-difficulty-select">

                    <div className="game-difficulty-title">
                      <h2>Select a difficulty or play on a fixed time limit</h2>
                    </div>

                      <Button
                        className="qwk-select"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[3].game_difficulty_name)}>
                        quick game</Button>
                      <Button
                        className="easy-select"
                        color="green"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[0].game_difficulty_name)}>
                        easy game</Button>
                      <Button
                        className="med-select"
                        color="green"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[1].game_difficulty_name)}>
                        medium game</Button>
                      <Button
                        className="hard-select"
                        color="green"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[2].game_difficulty_name)}>
                        hard game</Button>

                      <div className="time-display">{this.state.calculatedTime}</div>

                      <Button.Group className="fixed-time-select">
                        <Button
                          basic
                          color="blue"
                          className="min-1"
                          onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[3].game_difficulty_name)}>
                          01</Button>
                        <Button
                          basic
                          color="blue"
                          className="min-3"
                          onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[4].game_difficulty_name)}>
                          03</Button>
                        <Button
                          basic
                          color="blue"
                          className="min-5"
                          onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[5].game_difficulty_name)}>
                          05</Button>
                        <Button
                          basic
                          color="blue"
                          className="min-10"
                          onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[6].game_difficulty_name)}>
                          10</Button>

                      </Button.Group>

                      <Button circular className="go-back-gd-btn" onClick={this.props.onClose} icon='left chevron'/>
                      <Button circular className="next-gd-btn" onClick={this.props.onContinue} icon='right chevron'/>

                </Modal.Description>
                </Modal.Content>

            </Modal>
        )
    }
}

export default withRouter(GameDifficultySelection);
