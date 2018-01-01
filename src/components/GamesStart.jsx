import React from 'react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import {
  Button,
  Header,
  Image,
  Step,
  Modal } from 'semantic-ui-react';

  @connect((state) => {
    return {
      gameTypes: state.GamesListReducer.gameTypes,
      gameDifficulties: state.GamesListReducer.gameDifficulties,
      gameTypeSelected: state.GameReducer.gameTypeSelected,
      gameDifficultySelected: state.GameReducer.gameDifficultySelected,
      gameTypeDescription: state.GameReducer.gameDifficultySelected,
    }
  })

class GameStart extends React.Component {

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

              <Step completed>
                <Step.Content >
                  <Step.Title>Difficulty</Step.Title>
                  <Step.Description>{this.props.gameDifficultySelected || "Choose a difficulty"}</Step.Description>
                </Step.Content>
              </Step>

              <Step active>
                <Step.Content>
                  <Step.Title>Play</Step.Title>
                  <Step.Description>Start to play</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>

                <Modal.Content>
                <Modal.Description className="start-game-modal">
                    <div className="get-ready">Are you Ready?</div>
                    <Button circular className="dont-play" onClick={this.props.onClose} negative>Go Back</Button>
                    <Button circular className="play-now" onClick={this.props.onStart} positive>Let's Go!</Button>
                </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}

export default withRouter(GameStart);
