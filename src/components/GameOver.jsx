import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import  * as actions from '../actions/index.js';
import { formatSecondsToMMSS } from '../utils/index';

@connect((state) => {
  return {

    //pre game data
    userName: 'SenecaTheYounger',
    userID: 1,
    countGamesPlayed: 10,
    token: null,
    lastLogin: null,

    //game settings
    gameSelected: state.GameReducer.gameSelected,
    gameJSON: state.GameReducer.gameJSON,
    gameCenterCoords: state.GameReducer.gameCenterCoords,
    gameZoom: state.GameReducer.gameZoom,
    maxCountPolygons: state.GameReducer.maxCountPolygons,
    gameTypeSelected: state.GameReducer.gameTypeSelected,
    gameDifficultySelected: state.GameReducer.gameDifficultySelected,
    gameData: state.GameReducer.gameData,

    //score data
    countPolygonsEntered: state.ScoreReducer.countPolygonsEntered,
    countTotalSubmissions: state.ScoreReducer.countTotalSubmissions,
    polygonsAnswered: state.ScoreReducer.polygonsAnswered,
    polygonsUnanswered: state.ScoreReducer.polygonsUnanswered,
    polygonsSkipped: state.ScoreReducer.polygonsSkipped,
    incorrectEntries: state.ScoreReducer.incorrectEntries,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
    gameTimerRemaining: state.ScoreReducer.gameTimerRemaining,
    gameStartTimestamp: state.ScoreReducer.gameStartTimestamp,
    gameEndTimestamp: state.ScoreReducer.gameEndTimestamp,
    ipWhereGamePlayed: state.ScoreReducer.ipWhereGamePlayed,

  }
})

class GameOver extends React.Component {
    render() {
        return(
            <Modal
            open={this.props.open}
            closeOnRootNodeClick={false}>
                <Modal.Header>Game Over</Modal.Header>
                <Modal.Content>
                <Modal.Description>
                  <div className="game-over-score">
                    <div className="game-over-polygons-score">
                      <h1>Your Score: {this.props.countPolygonsEntered}/{this.props.maxCountPolygons}</h1>
                    </div>
                    <div className="game-over-time-score">
                      <h1>Time Remaining: {formatSecondsToMMSS(this.props.gameTimerRemaining)}</h1>
                    </div>
                    <div className="game-over-polygons-answered">
                      <h1>Countries Answered</h1>
                      <ul> {
                        this.props.polygonsAnswered.map((polygon) => (
                          <li key={polygon.id}>{polygon.name}</li>
                        )
                      )} </ul>
                    </div>
                    <div className="game-over-polygons-unanswered">
                      <h1>Countries Unanswered</h1>
                      <ul> {
                        this.props.polygonsUnanswered.map((polygon) => (
                          <li key={polygon.id}>{polygon.name}</li>
                        )
                      )} </ul>
                    </div>
                    {
                    this.props.gameTypeSelected !== 'Countdown'
                    ?
                    <div className="game-over-polygons-skipped">
                      <h1>Countries Skipped</h1>
                      <ul> {
                        this.props.polygonsSkipped.map((polygon) => (
                          <li key={polygon.id}>{polygon.name}</li>
                        )
                      )} </ul>
                    </div>
                    :
                    null
                    }
                  </div>
                </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.props.onDifferentGame} positive>Play Different Game</Button>
                    <Button onClick={this.props.onSeeHighScores}>See High Scores</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default withRouter(GameOver);
