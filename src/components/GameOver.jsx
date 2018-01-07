import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import  * as actions from '../actions/index.js';
import { formatSecondsToMMSS, capitalizeWords } from '../utils/index';

const gameOverThumb = require('-!file-loader?name=game-over-thumb!../assets/game-over-thumb.png');

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

                    <div className="go-stats">
                      <div className="go-img">
                          <img src={gameOverThumb}/>
                      </div>

                      <div className="go-game-selected">
                         {this.props.gameSelected}
                      </div>

                      <div className="go-game-type">
                        {
                          this.props.gameTypeSelected !== null ?
                          `Game Type: ${capitalizeWords(this.props.gameTypeSelected)}` :
                          null
                        }
                      </div>

                      <div className="go-game-difficulty">
                        Game Difficulty: {this.props.gameDifficultySelected}
                      </div>

                      <div className="go-polygons-score">
                        Your Score: {this.props.countPolygonsEntered}/{this.props.maxCountPolygons}
                      </div>

                      <div className="go-hints-used">
                        Hints Used: {this.props.countTotalHints}
                      </div>

                      <div className="go-time-score">
                        Time Remaining: {formatSecondsToMMSS(this.props.gameTimerRemaining)}
                      </div>
                    </div>

                    <div className="go-next-actions">

                      <button
                        className="play-again"
                        onClick={this.props.onDifferentGame}>
                        PLAY AGAIN</button>

                      <button
                        className="play-different-game"
                        onClick={this.props.onDifferentGame}>
                        PLAY DIFFERENT GAME</button>

                      <button
                        className="study-current-game"
                        onClick={this.props.onStudyCurrentGame}>
                        STUDY CURRENT GAME</button>

                      <button
                        className="see-high-scores"
                        onClick={this.props.onSeeHighScores}>
                        SEE HIGH SCORES</button>

                    </div>


                    <div className="go-polygons-unanswered-title">
                      Entries Unanswered
                    </div>

                    <div className="go-polygons-unanswered">
                      {
                        this.props.polygonsUnanswered.map((polygon) => (
                          <div key={polygon.id}>{capitalizeWords(polygon.name)}</div>
                        )
                      )}
                    </div>

                    <div className="go-polygons-answered-title">
                      Entries Answered
                    </div>

                    <div className="go-polygons-answered">

                       {
                        this.props.polygonsAnswered.map((polygon) => (
                          <div key={polygon.id}>{capitalizeWords(polygon.name)}</div>
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
                          <div key={polygon.id}>{capitalizeWords(polygon.name)}</div>
                        )
                      )}
                    </div>

                    :
                    null
                    }

                  </div>
                </Modal.Description>
                </Modal.Content>

            </Modal>
        )
    }
}

export default withRouter(GameOver);
