import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import  * as actions from '../actions/index.js';
import { formatSecondsToMMSS, capitalizeWords } from '../utils/index';

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
    countTotalHints: state.ScoreReducer.countTotalHints,
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
                <Modal.Content>
                <Modal.Description>
                  <div className="game-over-score">

                    <div className="go-title">GAME OVER</div>

                    <div className="play-again"></div>
                    <div className="study-missed-countries"></div>
                    <div className="see-high-scores"></div>

                    <div className="go-polygons-score">
                      Your Score: {this.props.countPolygonsEntered}/{this.props.maxCountPolygons}
                    </div>

                    <div className="go-hints-used">
                      Hints Used: {this.props.countTotalHints}
                    </div>

                    <div className="go-time-score">
                      Time Remaining: {formatSecondsToMMSS(this.props.gameTimerRemaining)}
                    </div>

                    <div className="go-polygons-unanswered-title">
                      Entries Unanswered
                    </div>

                    <div className="go-polygons-unanswered">
                      {
                        this.props.polygonsUnanswered.map((polygon) => (
                          <div>{capitalizeWords(polygon.name)}</div>
                        )
                      )}
                    </div>

                    <div className="go-polygons-answered-title">
                      Entries Answered
                    </div>

                    <div className="go-polygons-answered">

                       {
                        this.props.polygonsAnswered.map((polygon) => (
                          <div>{capitalizeWords(polygon.name)}</div>
                        )
                      )}

                    </div>

                    {
                      this.props.gameTypeSelected !== 'COUNTDOWN'
                      ?
                      <div className="go-polygons-skipped-title">
                        Entries Skipped
                      </div>
                      :
                      null
                    }

                    {
                    this.props.gameTypeSelected !== 'COUNTDOWN'
                    ?


                    <div className="go-polygons-skipped">

                      {
                        this.props.polygonsSkipped.map((polygon) => (
                          <div>{capitalizeWords(polygon.name)}</div>
                        )
                      )}
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
