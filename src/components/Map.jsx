"use strict";

/*global window.google*/
import React from 'react';
import { Button, Checkbox, Icon } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import GameTypeSelection from './GameTypeSelection';
import GameDifficultySelection from './GameDifficultySelection';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  sanitizeInput,
  countdownGameLogic,
  nameTheCountryGameLogic,
  toggleMissingCountries,
  mapDetails,
  getRandomUnansweredPolygon,
  buildPolygonResults,
  formatSecondsToMMSS,
  geoClickGameLogic,
} from '../utils/index';

import * as actions from '../actions/index.js'

let map;

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
    gameDifficultyID: state.ScoreReducer.gameDifficultyID,
    gameEndTimestamp: state.ScoreReducer.gameEndTimestamp,
    gameID: state.ScoreReducer.gameID,
    gameStartTimestamp: state.ScoreReducer.gameStartTimestamp,
    gameTimerRemaining: state.ScoreReducer.gameTimerRemaining,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
    gameTypeID: state.ScoreReducer.gameTypeID,
    incorrectEntries: state.ScoreReducer.incorrectEntries,
    ipWhereGamePlayed: state.ScoreReducer.ipWhereGamePlayed,
    polygonsAnswered: state.ScoreReducer.polygonsAnswered,
    polygonsUnanswered: state.ScoreReducer.polygonsUnanswered,
    polygonsSkipped: state.ScoreReducer.polygonsSkipped,
    // TODO: in the user login routines, we need to take the userID and stick
    // it in the store
    // userID: state.ScoreReducer.userID,

  }
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      userQuit: false,
      renderMissingCountriesButton: false,
      renderSkipCountryButton: false,
      renderInputField: true,
      gameSettings: true,
      gameType: true,
      gameDifficulty: false,
      gameStart: false,
      gameEnd: false,
      highlightedPolygon: null,
      currentHint: null,
      geoClickPolygonDisplay: '',
      playGeoClick: false,
    }
    this.incrementer = null;
    this.onInputChange = this.onInputChange.bind(this);
    this.handlePlayDifferentGame = this.handlePlayDifferentGame.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleGameTypeSelection = this.handleGameTypeSelection.bind(this);
    this.handleGameDifficultySelection = this.handleGameDifficultySelection.bind(this);
    this.handleGameEnd = this.handleGameEnd.bind(this);
    this.isEnd = this.isEnd.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
    this.skipCountry = this.skipCountry.bind(this);
    this.showHint = this.showHint.bind(this);
  }

  async componentDidMount() {

    if (this.props.gameSelected === 'Countdown'){}
    //initialize new google map and place it on '#map'
    map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: this.props.gameZoom,
      center: {
        lat: this.props.gameCenterCoords[0],
        lng: this.props.gameCenterCoords[1],
      },
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: 'roadmap',
      //turn off all country names and labels
      styles: mapDetails
    });
    //load in coordinate data with country name information
    map.data.loadGeoJson(this.props.gameJSON);
    //set all loaded coordinate data to a red fill color with no stroke
    map.data.setStyle({
      fillColor: 'firebrick',
      fillOpacity: '.6',
      strokeColor: 'orange',
      strokeWeight: '2'
    });
    //build gameData in redux and stores as this.props.gameData
    await this.props.dispatch(
      actions.initializeNewGame(this.props.gameJSON)
    );

  }


  handleGameTypeSelection() {

    this.setState({gameType: false, gameDifficulty: true})


    this.props.gameTypeSelected === 'Countdown' ?
      this.setState({renderMissingCountriesButton: true}) : null

    this.props.gameTypeSelected === 'Random Select' ?
      this.setState({renderSkipCountryButton: true}) : null

    this.props.gameTypeSelected === 'GeoClick' ?
      this.setState({renderInputField: false}) : null
  }

  handleGameDifficultySelection() {

    this.setState({gameDifficulty: false})
  }



  //on start focus client cursor to answerInput field and start timer?
  handleStart() {

    //pack gameValues for game init
    let gameValues = {

      map: map,
      countPolygonsEntered: this.props.countPolygonsEntered,
      countTotalSubmissions: this.props.countTotalSubmissions,
      incorrectEntries: this.props.incorrectEntries,
      dispatchFcn: this.props.dispatch,
      gameData: this.props.gameData,
      reactThis: this,
      highlightedPolygon: this.state.highlightedPolygon,

    }

    //focuses cursor in input-entry when user clicks 'start'
    this.nameInput.focus();
    //hides gameStart modal
    this.setState({gameStart: true})
    //starts timer
    this.incrementer = setInterval( () =>
      this.props.dispatch(
        actions.decrementTime(this.props.gameTimerRemaining)
      ), 1000);
    //dispatches gamestart gameStartTimestamp
    this.props.dispatch(
      actions.setGameStartTimestamp()
    )
    //initializes random country selector if game is not countdown
    if (this.props.gameTypeSelected !== 'Countdown') {
      nameTheCountryGameLogic(gameValues)
    }
  }
  //on quit, set change game state and clear timer
  handleGameEnd() {
    this.setState({
      userQuit: true,
      gameEnd : true });
      clearInterval(this.incrementer);
      //dispatches gameend gameEndTimestamp
      this.props.dispatch(
        actions.setGameEndTimestamp()
      )
      //builds and dispatches polygons answered/unanswered arrays for convenience
      this.props.dispatch(
        actions.setPolygonResults(
          buildPolygonResults(this.props.gameData)
        )
      )
    }

  //closes gameStart modal onClick
  async handlePlayDifferentGame() {
    //package Score
    let currentScore = {
      countPolygonsEntered: this.props.countPolygonsEntered,
      countTotalSubmissions: this.props.countTotalSubmissions,
      countTotalHints: this.props.countTotalHints,
      gameDifficultyID: this.props.gameDifficultyID,
      gameEndTimestamp: this.props.gameEndTimestamp,
      gameID: this.props.gameID,
      gameStartTimestamp: this.props.gameStartTimestamp,
      gameTimerRemaining: this.props.gameTimerRemaining,
      gameTimerStart: this.props.gameTimerStart,
      gameTypeID: this.props.gameTypeID,
      incorrectEntries: this.props.incorrectEntries,
      ipWhereGamePlayed: this.props.ipWhereGamePlayed,
      polygonsAnswered: this.props.polygonsAnswered,
      polygonsUnanswered: this.props.polygonsUnanswered,
      polygonsSkipped: this.props.polygonsSkipped,
      userID: this.props.userID,
    }
    //need to confirm whether all state must be returned back to init
    this.setState({ open: false });
    this.props.history.push('/');
    //clear game and score reducers
    this.props.dispatch(await actions.postScore(currentScore))

    this.props.dispatch(actions.resetGame())

    this.props.dispatch(actions.resetScore())
  }

  //registers inputs entered into input field
  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }
  //i dont think this is used at all...
  isEnd() {
    if(this.state.gameTimerRemaining === 0) {
      clearInterval(this.incrementer);
      return <GameOver onClose={ this.handleClose } open={this.state.gameOver}/>
    }
  }
  //keypress checks if key is 'enter'. registers value against answers and clears input
  keyPress(e) {
    // map.panTo({lat:24,lng:-76}) this will dynamically change map center

    if(e.keyCode == 13){
      console.log('this.state.gameEnd')
      console.log(this.state.gameEnd)
      let submission = e.target.value;
      //clear text input after user hits enter
      this.setState({inputValue: ''});
      //sanitize input to all lowercase and remove '.'
      let submissionSanitized = sanitizeInput(submission);
      let gameTypeSelected = this.props.gameTypeSelected;

      // build game values object to pass into game logic
      let gameValues = {

        submissionSanitized: submissionSanitized,
        map: map,
        countPolygonsEntered: this.props.countPolygonsEntered,
        countTotalSubmissions: this.props.countTotalSubmissions,
        incorrectEntries: this.props.incorrectEntries,
        dispatchFcn: this.props.dispatch,
        gameData: this.props.gameData,
        reactThis: this,
        highlightedPolygon: this.state.highlightedPolygon,
        handleGameEnd: this.handleGameEnd,

      }

      //check answer for countdown game
      if (gameTypeSelected === 'Countdown') {

        countdownGameLogic(gameValues);

      } else if ( gameTypeSelected === 'Random Select') {

        nameTheCountryGameLogic(gameValues, this.state.highlightedPolygon);

      } else {

        geoClickGameLogic()

      }

    //end keystroke if statement
    }
  //end keypress function
  }

  showMarkers(e) {
    this.setState({showMissingCountries: true})
    toggleMissingCountries(
      this.state.showMissingCountries,
      this.props.gameData,
      map,
    );
    setInterval( () => {
      this.setState({showMissingCountries: false})
    }, 3000);
  }

  showHint() {

    let gameTypeSelected = this.props.gameTypeSelected;
    //declare base sentence
    let hintSentence = 'This country starts with a';

    if (gameTypeSelected === 'Random Select') {
      //get first letter of country that was selected
      let hint = this.state.highlightedPolygon.acceptedAnswers[0][0];
      //if first letter of country is a vowel, change
      //from 'a' to 'an'
      ['a','e','i','o','u'].forEach((el) => {
        if (el === hint) {
          hintSentence = hintSentence + 'n';
        }
      })
      //change state to show hint
      this.setState({currentHint: `${hintSentence} "${hint.toUpperCase()}"`})
      //set state back to null
      setTimeout(()=>this.setState({currentHint: null}),2000)

    } else if (gameTypeSelected === 'Countdown') {

      for (let i = 0; i < this.props.gameData.length; i++){
        let el = this.props.gameData[i]
        if (el.polygonUnanswered){
          let hint = el.acceptedAnswers[0][0];
          ['a','e','i','o','u'].forEach((vowel) => {
            if (vowel === hint) {
              hintSentence = hintSentence + 'n';
            }
          })
                map.panTo({
                  lat: el.polygonCenterCoords[0],
                  lng: el.polygonCenterCoords[1]
                });
                map.setZoom(el.polygonZoomLevel);

                map.data.overrideStyle(
                  map.data.getFeatureById(el.id),
                    {
                      fillColor: 'aqua',
                      strokeColor: 'fuchsia',
                      strokeWeight: '4'
                    });

              //change state to show hint
              this.setState({currentHint: `${hintSentence} "${hint.toUpperCase()}"`})
              //set state back to null
              setTimeout(()=>{
                this.setState({currentHint: null})
                map.data.overrideStyle(
                  map.data.getFeatureById(el.id),
                  {
                    fillColor: 'firebrick',
                    fillOpacity: '.6',
                    strokeColor: 'orange',
                    strokeWeight: '2'
                  });
              },2000)
              break;
        }

      }
    }

    //incrementHints
    this.props.dispatch(
      actions.incrementTotalHints(this.props.countTotalHints)
    );

  }

  skipCountry(e) {

    let gameValues = {

      map: map,
      countTotalSubmissions: this.props.countTotalSubmissions,
      dispatchFcn: this.props.dispatch,
      gameData: this.props.gameData,
      reactThis: this,
      highlightedPolygon: this.state.highlightedPolygon,
      handleGameEnd: this.handleGameEnd,

    }

    nameTheCountryGameLogic(gameValues, this.state.highlightedPolygon, true);
  }

  render() {
    return (
      <div className="game-container">

        <div className="game-region">{ this.props.gameSelected }</div>
        <div className="game-type">{ this.props.gameTypeSelected}</div>
        <div className="game-difficulty">{ this.props.gameDifficultySelected }</div>
        <div className="maps" id="map"></div>

        <div className="game-controls">

          <GameTypeSelection
            onClose={ this.handleClose }
            onContinue={this.handleGameTypeSelection}
            open={this.state.gameType}
          />

          <GameDifficultySelection
            onClose={ this.handleClose }
            onContinue={this.handleGameDifficultySelection}
            open={this.state.gameDifficulty}
          />

          <GameStart
            onClose={ this.handleClose }
            onStart={this.handleStart}
            open={!this.state.gameType && !this.state.gameDifficulty && !this.state.gameStart}
          />

          <GameOver
            onDifferentGame={ this.handlePlayDifferentGame }
            onStart={this.handleStart}
            open={this.state.gameEnd}
          />

          <div className="time-remaining-title"> Time Remaining: </div>
          <div className="polygon-score-title"> Countries Answered: </div>

          <div className="time-remaining"> {formatSecondsToMMSS(this.props.gameTimerRemaining)} </div>
          <div className="polygon-score"> {this.props.countPolygonsEntered}/{this.props.maxCountPolygons} </div>

          {
            this.state.currentHint !== null
            ?
            <div className="hint-display"><h1>{this.state.currentHint}</h1></div>
            :
            null
          }

          {
            this.state.playGeoClick
            ?
            <div
              className="geoClick-display">
              {this.state.geoClickPolygonDisplay}
            </div>
            :
            <input
              className="entry-display"
              ref={(input) => { this.nameInput = input; }}
              onChange={ this.onInputChange }
              onKeyDown={this.keyPress}
              value={ this.state.inputValue }>
            </input>
          }

          {
            true
            ?
            <Button className="hint-btn" onClick={ this.showHint }>HINT</Button>
            :
            null
          }

          {
            this.state.renderMissingCountriesButton
            ?
            <Button className="advance-btn" onClick={ this.showMarkers } icon="globe"/>
            : null
          }

          {
            this.state.renderSkipCountryButton
            ?
            <Button className="advance-btn" onClick={ this.skipCountry }>SKIP</Button>
            : null
          }

          <Button className="quit-game-btn" onClick={this.handleGameEnd}>QUIT</Button>

          {/* end game controls */}
        </div>
        {/* end game container */}
      </div>
      // end return for render
      );
    // end render
    }
//end class constructor
}
