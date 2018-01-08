import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Checkbox,
  Modal,
  Icon,
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
    this.showTimeResult = this.showTimeResult.bind(this);
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

  async showTimeResult(value){
        //set gameTimerRemaining, gameTimerStart, gameDifficultyID
        let timeManipulation;
        let newTime;
        let displayTime;

        await this.props.gameDifficulties.forEach((el) => {
          if(el.game_difficulty_name === value) {
            timeManipulation = JSON.parse(el.game_time_manipulation)
            newTime = manipulateTimer(timeManipulation, this.props.baseTime)
          }
        });
        displayTime = await formatSecondsToMMSS(newTime)

        await this.setState({calculatedTime: displayTime})
  }


  async handleDifficultySettings(value) {
    //set gameTimerRemaining, gameTimerStart, gameDifficultyID
    await this.props.gameDifficulties.forEach((el) => {
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
    let displayTime;
    displayTime = await formatSecondsToMMSS(this.props.gameTimerStart)

    await this.setState({calculatedTime: displayTime})

    this.props.onContinue()

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
                      SELECT A DIFFICULTY
                    </div>

                      <Button
                        className="qwk-select"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[3].game_difficulty_name)}
                        onMouseEnter={() => this.showTimeResult(this.props.gameDifficulties[3].game_difficulty_name)}>
                        QUICK</Button>
                      <Button
                        className="easy-select"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[0].game_difficulty_name)}
                        onMouseEnter={() => this.showTimeResult(this.props.gameDifficulties[0].game_difficulty_name)}>
                        EASY</Button>
                      <Button
                        className="med-select"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[1].game_difficulty_name)}
                        onMouseEnter={() => this.showTimeResult(this.props.gameDifficulties[1].game_difficulty_name)}>
                        NORMAL</Button>
                      <Button
                        className="hard-select"
                        onClick={() => this.handleDifficultySettings(this.props.gameDifficulties[2].game_difficulty_name)}
                        onMouseEnter={() => this.showTimeResult(this.props.gameDifficulties[2].game_difficulty_name)}>
                        HARD</Button>

                      <div className="time-display">{this.state.calculatedTime}</div>


                      <Button
                        animated
                        className="go-back-gd-btn"
                        onClick={this.props.onGoBack}>
                          <Button.Content hidden>
                            <Icon name="arrow left"/>
                          </Button.Content>
                          <Button.Content visible>
                            BACK
                          </Button.Content>
                      </Button>

                </Modal.Description>
                </Modal.Content>

            </Modal>
        )
    }
}

export default withRouter(GameDifficultySelection);
