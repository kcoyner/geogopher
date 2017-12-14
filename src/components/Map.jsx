/*global window.google*/
import React from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import GameSettings from './GameSettings';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  sanitizeInput,
  checkAnswerCountdown,
  toggleMissingCountries,
  mapDetails
} from '../utils/index';

import {
  initializeNewGame,
  submitCorrectEntry,
  submitIncorrectEntry,
  decrementTime,
  startGame,
  incrementTotalAttempts,
} from '../actions/Game.actions';

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
    polygonsAnswered: state.ScoreReducer.polygonsAnswered,
    polygonsUnanswered: state.ScoreReducer.polygonsUnanswered,
    incorrectEntries: state.ScoreReducer.incorrectEntries,
    gameTimerStart: state.ScoreReducer.gameTimerStart,
    gameTimerRemaining: state.ScoreReducer.gameTimerRemaining,
    gameStartTimestamp: state.ScoreReducer.gameStartTimestamp,
    gameEndTimestamp: state.ScoreReducer.gameEndTimestamp,
    ipWhereGamePlayed: state.ScoreReducer.ipWhereGamePlayed,

  }
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      userQuit: false,
      renderMissingCountriesButton: false,
      gameSettings: true,
      gameStart: false,
      gameEnd: false,
    }
    this.incrementer = null;
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
    this.isEnd = this.isEnd.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.showMarkers = this.showMarkers.bind(this);
  }

  componentDidMount() {
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
      strokeWeight: '1'
    });
    //build game instance in redux and stores as gameData
    this.props.dispatch(
      initializeNewGame(this.props.gameJSON)
    );

  }
  //on quit, set change game state and clear timer
  handleQuit() {
    this.setState({
      userQuit: true,
      gameEnd : true });
    clearInterval(this.incrementer);
  }
  //on start focus client cursor to answerInput field and start timer?
  handleStart() {
      this.nameInput.focus();
      this.setState({gameStart: true})
      this.incrementer = setInterval( () =>
        this.props.dispatch(
          decrementTime(this.props.secondsElapsed)
        ), 1000);
    }
  //closes gameStart modal onClick
  handleClose(){
    this.setState({ open: false });
    this.props.history.push('/');
  }
  //regisers inputs entered into input field
  onInputChange(e) {
    this.setState({ inputValue: e.target.value })
  }
  //resets timer and returns gameOver modal
  isEnd() {
    if(this.state.secondsElapsed === 0) {
      clearInterval(this.incrementer);
      return <GameOver onClose={ this.handleClose } open={this.state.gameOver}/>
    }
  }
  //keypress checks if key is 'enter'. registers value against answers and clears input
  keyPress(e) {
    // map.setCenter({lat:24,lng:-76}) this will dynamically change map center

    if(e.keyCode == 13){
        let answerInputted = e.target.value;
        //clear text input after user hits enter
        this.setState({inputValue: ''});
        //sanitize input to all lowercase and remove '.'
        let answerSanitized = sanitizeInput(answerInputted);
        //check answer for countdown game
        let answerResponse = checkAnswerCountdown(answerSanitized, this.props.gameData);

        if (answerResponse[0] === 'incorrect') {
          //dispatch and add to incorrectCountriesEntered
          this.props.dispatch(
            submitIncorrectEntry(
              answerInputted,
              this.props.incorrectEntries
            )
          );
        } else if (answerResponse[0] === 'unanswered') {
          //modify polygon fillColor
          let polygon = map.data.getFeatureById(answerResponse[1])
          map.data.overrideStyle(polygon, {fillOpacity: '0.5', fillColor: '#7FF000', strokeColor: 'black'})
          //dispatch to modify game data to register correct answer
          //and increment number of polygons identified by 1
          this.props.dispatch(
            submitCorrectEntry(
              this.props.countPolygonsIdentified,
              answerResponse[1],
              this.props.gameData
            )
          );
        }
        //increment totalAttempts
        this.props.dispatch(
          incrementTotalAttempts(
            this.props.totalAttempts
          )
        );
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

  render() {
    return (
      <div className="container">
        <div className="game-controls">

          <GameStart
            onClose={ this.handleClose }
            onStart={this.handleStart}
            open={this.state.gameStart}
          />

        <div className="game-title">
          <h1>World Countries</h1>
          <h2>Countdown | Normal</h2>
        </div>

        <div className="show-missing-countries">
          <Checkbox checked={this.state.showMissingCountries} onClick={ this.showMarkers }toggle />
        </div>

        <div className="time-remaining-title">
          <h1> Time Remaining:</h1>
        </div>

        <div className="time-remaining">
          <h1> {this.props.secondsElapsed} </h1>
        </div>

        <div className="countries-answered">
          <h1> Countries Answered: {this.props.countPolygonsIdentified}/{this.props.maxCountPolygons} </h1>
        </div>

        <input
          className="input-entry"
          ref={(input) => { this.nameInput = input; }}
          onChange={ this.onInputChange }
          onKeyDown={this.keyPress}
          value={ this.state.inputValue }>
        </input>

        {this.isEnd()}

        <Button className="quit-game-btn" onClick={this.handleQuit}>Quit Game</Button>

        {
          this.state.quit ?
          <GameOver onClose={ this.handleClose } open={this.props.gameOver}/>
          :
            null
        }

        <div className="maps" id="map"></div>
      </div>
      </div>
      );
  }
}
