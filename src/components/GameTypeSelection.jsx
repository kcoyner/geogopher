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
  Reveal,
  Popup } from 'semantic-ui-react';
import {
  setGameTypeID,
  setGameDifficultyID,
  setTimer,
} from '../actions/Score.actions'
import { setGameType, setGameDifficulty } from '../actions/Game.actions'
import { manipulateTimer } from '../utils/manipulateTimer'

const countdownGif = require('-!file-loader?name=countdown!../assets/countdown.gif');
const randomselectGif = require('-!file-loader?name=random-select!../assets/random-select.gif');
const geoclickGif = require('-!file-loader?name=geoclick!../assets/geoclick.gif');
const countdownThumb = require('-!file-loader?name=countdown-thumb!../assets/countdown-thumb.png');
const randomselectThumb = require('-!file-loader?name=random-select-thumb!../assets/random-select-thumb.png');
const geoclickThumb = require('-!file-loader?name=geoclick-thumb!../assets/geoclick-thumb.png');

@connect((state) => {
  return {
    gameTypes: state.GamesListReducer.gameTypes,
    gameTypeSelected: state.GamesListReducer.gameTypeSelected,
    gameDifficulties: state.GamesListReducer.gameDifficulties,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
    baseTime: state.GameReducer.baseTime
  }
})


class GameTypeSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameTypeChoices: null,
      gameDifficultyChoices: null,
      gameTypeDescription: null,
    };
    this.setGameType = this.setGameType.bind(this);
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

  async setGameType(value) {
    await this.props.gameTypes.forEach((el) => {
      if (el.game_type_id === value) {
        this.setState({gameTypeDescription: el.game_type_description});
        //dispatch gameTypeID to scores
        this.props.dispatch(setGameTypeID(el.game_type_id))
        this.props.dispatch(setGameType(el.game_type_name))
      }
    });
    this.props.onContinue();
  }


    render() {


        return(

            <Modal
            open={this.props.open}
            closeOnRootNodeClick={false}>
            <Step.Group ordered attached='top'>
              <Step active>
                <Step.Content>
                  <Step.Title>Game Type</Step.Title>
                  <Step.Description>Choose a game type</Step.Description>
                </Step.Content>
              </Step>

              <Step >
                <Step.Content>
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
                <Modal.Description className="game-type-select">
                    <div className="game-type-title">
                      CHOOSE A GAME TYPE
                    </div>

                      <Popup
                        trigger={
                          <Reveal className="select-countdown" animated='small fade' onClick={() => this.setGameType(1)}>
                            <Reveal.Content visible>
                              <Image src={countdownThumb} size='large' />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                              <Image src={countdownGif} size='large' />
                            </Reveal.Content>
                          </Reveal>
                        }
                          header={this.props.gameTypes[0].game_type_name}
                          content={this.props.gameTypes[0].game_type_description}
                          position="bottom center"
                          size="huge"
                          wide="very"
                          basic
                        />

                      <Popup
                        trigger={
                        <Reveal className="select-random-select" animated='small fade' onClick={() => this.setGameType(2)}>
                          <Reveal.Content visible>
                            <Image src={randomselectThumb} size='large' />
                          </Reveal.Content>
                          <Reveal.Content hidden>
                            <Image src={randomselectGif} size='large' />
                          </Reveal.Content>
                        </Reveal>
                      }
                        header={this.props.gameTypes[1].game_type_name}
                        content={this.props.gameTypes[1].game_type_description}
                        position="bottom center"
                        size="huge"
                        wide="very"
                        basic
                      />

                    <Popup
                      trigger={
                      <Reveal className="select-geoclick" animated='small fade' onClick={() => this.setGameType(3)}>
                        <Reveal.Content visible>
                          <Image src={geoclickThumb} size='large' />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                          <Image src={geoclickGif} size='large' />
                        </Reveal.Content>
                      </Reveal>
                    }
                      header={this.props.gameTypes[2].game_type_name}
                      content={this.props.gameTypes[2].game_type_description}
                      position="bottom center"
                      size="huge"
                      wide="very"
                      basic
                    />


                    <Button
                      animated
                      className="go-back-gt-btn"
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

export default withRouter(GameTypeSelection);
