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
  Reveal,
  Popup } from 'semantic-ui-react';
import {
  setGameTypeID,
  setGameDifficultyID,
  setTimer,
} from '../actions/Score.actions'
import { setGameType, setGameDifficulty } from '../actions/Game.actions'
import { manipulateTimer } from '../utils/manipulateTimer'

const thmb9 = require('-!file-loader?name=chris!../assets/chris.jpg');
const thmb8 = require('-!file-loader?name=square-image!../assets/square-image.png');

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

  setGameType(value) {
    this.props.gameTypes.forEach((el) => {
      if (el.game_type_id === value) {
        this.setState({gameTypeDescription: el.game_type_description});
        //dispatch gameTypeID to scores
        this.props.dispatch(setGameTypeID(el.game_type_id))
        this.props.dispatch(setGameType(el.game_type_name))
      }
    });
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
                      Choose a Game Type
                    </div>

                      <Popup
                        trigger={
                          <Reveal className="select-countdown" animated='move' onClick={() => this.setGameType(1)}>
                            <Reveal.Content visible>
                              <Image src={thmb8} size='small' />
                            </Reveal.Content>
                            <Reveal.Content hidden>
                              <Image src={thmb9} size='small' />
                            </Reveal.Content>
                          </Reveal>
                        }
                          header={this.props.gameTypes[0].game_type_name}
                          content={this.props.gameTypes[0].game_type_description}
                          position="bottom center"
                          basic
                        />

                      <Popup
                        trigger={
                        <Reveal className="select-random-select" animated='move' onClick={() => this.setGameType(2)}>
                          <Reveal.Content visible>
                            <Image src={thmb8} size='small' />
                          </Reveal.Content>
                          <Reveal.Content hidden>
                            <Image src={thmb9} size='small' />
                          </Reveal.Content>
                        </Reveal>
                      }
                        header={this.props.gameTypes[1].game_type_name}
                        content={this.props.gameTypes[1].game_type_description}
                        position="bottom center"
                        basic
                      />

                    <Popup
                      trigger={
                      <Reveal className="select-geoclick" animated='move' onClick={() => this.setGameType(3)}>
                        <Reveal.Content visible>
                          <Image src={thmb8} size='small' />
                        </Reveal.Content>
                        <Reveal.Content hidden>
                          <Image src={thmb9} size='small' />
                        </Reveal.Content>
                      </Reveal>
                    }
                      header={this.props.gameTypes[2].game_type_name}
                      content={this.props.gameTypes[2].game_type_description}
                      position="bottom center"
                      basic
                    />

                    {/* <Dropdown className="game-type-dropdown" placeholder='Select Game Type' fluid selection options={this.state.gameTypeChoices} onChange={this.getDescription} />
                    <div className="setting-description">
                      <h3>{this.state.gameTypeDescription}</h3>
                    </div> */}

                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button circular onClick={this.props.onClose} icon='left chevron'/>
                    <Button circular onClick={this.props.onContinue} icon='right chevron'/>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameTypeSelection);
