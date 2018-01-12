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
  capitalizeWords,
} from '../utils/index';

import * as actions from '../actions/index.js'

let map;

@connect((state) => {
  return {

    //pre game data
    user: state.UserReducer.user.user,
    userID: state.UserReducer.user.user_id,
    countGamesPlayed: state.UserReducer.countGamesPlayed,
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
      gameType: true,
      gameDifficulty: false,
      gameStart: false,
      gameEnd: false,
      geoJsonLoaded: false,
      highlightedPolygon: null,
      currentHint: null,
      skipInProgress: false,
      hintInProgress: false,
      currentSoundState: true,
      geoClickPolygonDisplay: '',
      oneStepBack: {
        gameType: true,
        gameDifficulty: false,
        gameStart: false,
      },
      twoStepsBack: {
        gameType: true,
        gameDifficulty: false,
        gameStart: false,
      },
    }
    this.incrementer = null;
    this.onInputChange = this.onInputChange.bind(this);
    this.handlePlayDifferentGame = this.handlePlayDifferentGame.bind(this);
    this.studyCurrentGame = this.studyCurrentGame.bind(this);
    this.seeHighScores = this.seeHighScores.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleGameTypeSelection = this.handleGameTypeSelection.bind(this);
    this.handleGameDifficultySelection = this.handleGameDifficultySelection.bind(this);
    this.handleGameEnd = this.handleGameEnd.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
    this.skipCountry = this.skipCountry.bind(this);
    this.showHint = this.showHint.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
  }

  componentDidUpdate() {
    if (this.props.gameTimerRemaining === 61) {
      this.refs.oneMinute.play()
    }
    if (this.props.gameTimerRemaining === 6) {
      this.refs.countdown.play()
    }
    if (this.props.gameTimerRemaining === 1) {
      setTimeout(()=> {
        this.props.dispatch(
          actions.decrementTime(this.props.gameTimerRemaining + 1)
        );
        this.handleGameEnd();
      } , 1000)
    }
  }

  async componentDidMount() {

    //initialize new google map and place it on '#map'
    map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: this.props.gameZoom,
      center: {
        lat: this.props.gameCenterCoords[0],
        lng: this.props.gameCenterCoords[1],
      },
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: 'roadmap',
      //turn off all country names and labels
      styles: mapDetails,
      disableDefaultUI: true
    });
    //load in coordinate data with country name information
    map.data.loadGeoJson(this.props.gameJSON, "",(features) => {
      this.setState({geoJsonLoaded: true})
    });
    //set all loaded coordinate data to a red fill color with no stroke
    map.data.setStyle({
      fillColor: 'indianred',
      fillOpacity: '1',
      strokeColor: 'orange',
      strokeWeight: '2'
    });
    //build gameData in redux and stores as this.props.gameData
    if (this.props.gameSelected.indexOf('Capitals') > -1) {
      await this.props.dispatch(
        actions.initializeNewGame(this.props.gameJSON, 'Capitals')
      );

    } else {

      await this.props.dispatch(
        actions.initializeNewGame(this.props.gameJSON, 'Countries')
      );

    }

  }

  handleGoBack() {

    if (
      this.state.gameType &&
      !this.state.gameDifficulty &&
      !this.state.gameStart &&
      this.state.oneStepBack.gameType &&
      !this.state.oneStepBack.gameDifficulty &&
      !this.state.oneStepBack.gameStart
    ) {
      this.props.history.push('/');
    } else {
      this.setState(
        {
          gameType: this.state.oneStepBack.gameType,
          gameDifficulty: this.state.oneStepBack.gameDifficulty,
          gameStart: this.state.oneStepBack.gameStart,
        }
      )

      this.setState(
        {
          oneStepBack:
            {
              gameType: this.state.twoStepsBack.gameType,
              gameDifficulty: this.state.twoStepsBack.gameDifficulty,
              gameStart: this.state.twoStepsBack.gameStart,
            }
        }
      )
    }

  }


  handleGameTypeSelection() {
    this.setState(
      {
        oneStepBack:
          {
            gameType: this.state.gameType,
            gameDifficulty: this.state.gameDifficulty,
            gameStart: this.state.gameStart,
          },
        twoStepsBack:
          {
            gameType: this.state.oneStepBack.gameType,
            gameDifficulty: this.state.oneStepBack.gameDifficulty,
            gameStart: this.state.oneStepBack.gameStart,
          },
      })

    this.setState({gameType: false, gameDifficulty: true})

    this.props.gameTypeSelected === 'COUNTDOWN' ?
      this.setState({renderMissingCountriesButton: true}) : null

    this.props.gameTypeSelected === 'RANDOM SELECT' ?
      this.setState({renderSkipCountryButton: true}) : null

    if (this.props.gameTypeSelected === 'GEOCLICK') {
      this.setState({renderInputField: false})
      this.setState({renderSkipCountryButton: true})
    }

  }

  handleGameDifficultySelection() {
    this.setState(
      {
        oneStepBack:
          {
            gameType: this.state.gameType,
            gameDifficulty: this.state.gameDifficulty,
            gameStart: this.state.gameStart,
          },
        twoStepsBack:
          {
            gameType: this.state.oneStepBack.gameType,
            gameDifficulty: this.state.oneStepBack.gameDifficulty,
            gameStart: this.state.oneStepBack.gameStart,
          },
      })


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
      skipInProgress: this.state.skipInProgress,
      dispatchFcn: this.props.dispatch,
      gameData: this.props.gameData,
      reactThis: this,
      highlightedPolygon: this.state.highlightedPolygon,
      handleGameEnd: this.handleGameEnd,
      gameSelected: this.props.gameSelected,
      currentSoundState: this.state.currentSoundState,
      refs: this.refs
    }
    if (this.props.gameTypeSelected !== 'GEOCLICK') {
      //focuses cursor in input-entry when user clicks 'start'
      this.nameInput.focus();
    }
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
    if (this.props.gameTypeSelected === 'RANDOM SELECT') {
      nameTheCountryGameLogic(gameValues);
    } else if (this.props.gameTypeSelected === 'GEOCLICK') {
      geoClickGameLogic(gameValues);
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
      userID: this.props.userID
    }
    //need to confirm whether all state must be returned back to init
    this.setState({ open: false });
    console.log("++++++++++", currentScore.userID);
    //clear game and score reducers
    this.props.dispatch(await actions.postScore(currentScore))

    this.props.dispatch(actions.resetGame())

    this.props.dispatch(actions.resetScore())

    this.props.history.push('/');
  }

  studyCurrentGame() {

    this.props.history.push('/explore')

  }


  async seeHighScores() {
    // This should probably get factored out of this and the above function
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
      userID: this.props.userID
    }
    this.setState({ open: false });

    this.props.dispatch(await actions.postScore(currentScore))


    let path = "/high-scores/" + this.props.gameID + "/" + this.props.gameTypeID + "/" + this.props.gameDifficultyID;
    this.props.history.push({
      pathname: path,
    })

    this.props.dispatch(actions.resetGame())

    this.props.dispatch(actions.resetScore())

  }

  //registers inputs entered into input field
  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }

  //keypress checks if key is 'enter'. registers value against answers and clears input
  keyPress(e) {
    // map.panTo({lat:24,lng:-76}) this will dynamically change map center

    if(e.keyCode == 13){
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
        currentSoundState: this.state.currentSoundState,
        refs: this.refs,
      }

      //check answer for countdown game
      if (gameTypeSelected === 'COUNTDOWN') {

        countdownGameLogic(gameValues);

      } else if ( gameTypeSelected === 'RANDOM SELECT') {

        nameTheCountryGameLogic(gameValues, this.state.highlightedPolygon);

      } else {

        geoClickGameLogic(gameValues, this.state.highlightedPolygon);

      }
      if(gameValues.incorrectEntries.indexOf(submission) < 0) {

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
    this.nameInput.focus();
  }

  showHint() {

    let gameTypeSelected = this.props.gameTypeSelected;
    //declare base sentence
    let hintSentence = 'The answer starts with a';
    this.setState({hintInProgress: true})

    if (this.state.hintInProgress || this.state.skipInProgress) {
      this.setState({hintInProgress: false})
      this.nameInput.focus();
      return
    }

    if (gameTypeSelected === 'RANDOM SELECT' ) {
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
      setTimeout( () => {
        this.setState({currentHint: null});
        this.setState({hintInProgress: false});
      },2000)

    } else if (gameTypeSelected === 'COUNTDOWN') {

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
                    fillColor: 'indianred',
                    fillOpacity: '1',
                    strokeColor: 'orange',
                    strokeWeight: '2'
                  });
              },2000)
              this.nameInput.focus();
              break;
        }
      }

      this.setState({hintInProgress: false});

    } else {
      //hint logic for geoClick
      let polygonId = this.state.highlightedPolygon.id;
      let hintsArr;

      polygonId + 5 > this.props.maxCountPolygons ?
      hintsArr = Array.from([0, 1, 2, 3, 4], x => (polygonId - 4) + x) :
      hintsArr = Array.from([0, 1, 2, 3, 4], x => polygonId + x)
      console.log(hintsArr)
      this.setState({currentHint: "It's one of these"})
      hintsArr.forEach((el) => {
        map.data.overrideStyle(
          map.data.getFeatureById(el),
              {
                fillColor: 'aqua',
                strokeColor: 'fuchsia',
                strokeWeight: '2'
              }
        )

      setTimeout(()=>{
        this.setState({currentHint: null})
        map.data.overrideStyle(
          map.data.getFeatureById(el),
          {
            fillColor: 'firebrick',
            fillOpacity: '.6',
            strokeColor: 'orange',
            strokeWeight: '2'
          });
          this.setState({hintInProgress: false});
      },2000)
      });
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
      skipInProgress: this.state.skipInProgress,
      gameData: this.props.gameData,
      reactThis: this,
      highlightedPolygon: this.state.highlightedPolygon,
      handleGameEnd: this.handleGameEnd,
      gameSelected: this.props.gameSelected,
      currentSoundState: this.state.currentSoundState,
      refs: this.refs
    }

    if (this.props.gameTypeSelected === 'RANDOM SELECT') {

      nameTheCountryGameLogic(gameValues, gameValues.highlightedPolygon, true);

    } else if (this.props.gameTypeSelected === 'GEOCLICK') {

      geoClickGameLogic(gameValues, gameValues.highlightedPolygon, true);

      setTimeout( () => {
        this.handleClick();
      }, 2000)

    }
    //refocus on input if not geoclick
    this.props.gameTypeSelected !== 'GEOCLICK' ? this.nameInput.focus() : null

  }

  zoomIn(){
    let currentZoomLevel = map.getZoom();
    currentZoomLevel != 18 ? map.setZoom(currentZoomLevel + 1) : null
    this.nameInput.focus();
  }

  zoomOut(){
    let currentZoomLevel = map.getZoom();
    currentZoomLevel != 0 ? map.setZoom(currentZoomLevel - 1) : null
    this.nameInput.focus();
  }

  handleClick() {

    let gameValues = {
      map: map,
      countTotalSubmissions: this.props.countTotalSubmissions,
      dispatchFcn: this.props.dispatch,
      gameData: this.props.gameData,
      reactThis: this,
      highlightedPolygon: this.state.highlightedPolygon,
      handleGameEnd: this.handleGameEnd,
      countPolygonsEntered: this.props.countPolygonsEntered,
      gameSelected: this.props.gameSelected,
      currentSoundState: this.state.currentSoundState,
      refs: this.refs
    }

    if (this.props.gameTypeSelected === 'GEOCLICK') {
      if (!google.maps.event.hasListeners(map.data, 'click')) {
        geoClickGameLogic(gameValues, this.state.highlightedPolygon)
      }
    } else {
      this.nameInput.focus();
    }
  }

/** Sound toggle */
  toggleSoundState = (e) => {
    this.state.currentSoundState ?
    this.setState({ currentSoundState: false} ) :
    this.setState({ currentSoundState: true} )
    this.props.gameTypeSelected !== 'GEOCLICK' ? this.nameInput.focus() : null
  }

  render() {
    return (
      <div className="game-container">
        <div className="game-region">{ this.props.gameSelected }</div>
        <div className="game-type">{ this.props.gameTypeSelected}</div>
        <div className="game-difficulty">{ this.props.gameDifficultySelected }</div>

        <div
          className="maps"
          id="map"
          onClick={this.handleClick}>
        </div>

        <div className="game-controls">

          <GameTypeSelection
            onGoBack={ this.handleGoBack }
            onContinue={this.handleGameTypeSelection}
            open={this.state.gameType}
          />

          <GameDifficultySelection
            onGoBack={ this.handleGoBack }
            onContinue={this.handleGameDifficultySelection}
            open={this.state.gameDifficulty}
          />

          <GameStart
            onGoBack={ this.handleGoBack }
            onStart={this.handleStart}
            mapLoaded={this.state.geoJsonLoaded}
            open={!this.state.gameType && !this.state.gameDifficulty && !this.state.gameStart}
          />

          <GameOver
            onDifferentGame={ this.handlePlayDifferentGame }
            onSeeHighScores={ this.seeHighScores }
            onStudyCurrentGame={ this.studyCurrentGame }
            onStart={this.handleStart}
            open={this.state.gameEnd}
          />

          <div className="time-remaining-title"> Time Remaining: </div>
          <div className="polygon-score-title"> Countries Answered: </div>


          { /* time remaining */
            (this.props.gameTimerRemaining <= 0) && (this.props.gameTimerRemaining !== null)
            ?
          <div className="time-remaining">
            Game Over
          </div>
            :
          <div className="time-remaining">
            {formatSecondsToMMSS(this.props.gameTimerRemaining)}
          </div>
          }

          <div className="polygon-score"> {this.props.countPolygonsEntered}/{this.props.maxCountPolygons} </div>

        { /** Sound toggle button */
          <div className="sound-btn">
            SOUND&nbsp;
            <Checkbox
              checked={ this.state.currentSoundState }
              onClick={ this.toggleSoundState }toggle
            />
          </div>
        }

          {
            this.state.currentHint !== null
            ?
            <div className="hint-display"><h1>{this.state.currentHint}</h1></div>
            :
            null
          }

          {
            this.state.renderInputField
            ?
            <input
              className="entry-display"
              ref={(input) => { this.nameInput = input; }}
              onChange={ this.onInputChange }
              onKeyDown={this.keyPress}
              value={ this.state.inputValue }>
            </input>
            :
            <div
              className="geoClick-display">
              {capitalizeWords(this.state.geoClickPolygonDisplay)}
            </div>
          }

          <div className="zoom-in">
            <div className="zi-btn"
                 onClick={this.zoomIn}>+</div>
          </div>
          <div className="zoom-out">
            <div className="zo-btn"
                 onClick={this.zoomOut}>-</div>
          </div>

          {
            true
            ?
            <div className="hint-btn" onClick={ this.showHint }>HINT</div>
            :
            null
          }

          {
            this.state.renderMissingCountriesButton
            ?
            <div className="advance-btn" onClick={ this.showMarkers }>
              <Icon name="globe" size="large"/>
            </div>
            : null
          }

          {
            this.state.renderSkipCountryButton
            ?
            <div className="advance-btn" onClick={ this.skipCountry }>SKIP</div>
            : null
          }

          <div className="quit-game-btn" onClick={this.handleGameEnd}>QUIT</div>

          <audio ref='entry_correct'>
            <source src='https://s3.amazonaws.com/geogopher-assets/sounds/correct.m4a' type='audio/mpeg'></source>
          </audio>
          <audio ref='entry_incorrect'>
            <source src='https://s3.amazonaws.com/geogopher-assets/sounds/incorrect.m4a' type='audio/mpeg'></source>
          </audio>
          <audio ref='entry_correct_resubmit'>
            <source src='https://s3.amazonaws.com/geogopher-assets/sounds/correct_resubmit.m4a' type='audio/mpeg'></source>
          </audio>
          <audio ref='countdown'>
            <source src='https://s3.amazonaws.com/geogopher-assets/sounds/countdown_5-1_male.m4a' type='audio/mpeg'></source>
          </audio>
          <audio ref='oneMinute'>
            <source src='https://s3.amazonaws.com/geogopher-assets/sounds/one_minute_remaining.m4a' type='audio/mpeg'></source>
          </audio>

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
