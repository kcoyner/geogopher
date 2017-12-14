/*global window.google*/
import React from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitizeInput } from '../utils/answerSanitize';
import { checkAnswerCountdown } from '../utils/checkAnswerInputted';
import { toggleMissingCountries } from '../utils/toggleMissingCountries';
import { mapDetails } from '../utils/mapDetails';
import {
  initializeNewGame,
  submitCorrectAnswer,
  submitIncorrectEntry,
  decrementTime,
  startGame,
  incrementTotalAttempts,
} from '../actions/Game.actions';

let map;

@connect((state) => {
  return {

    secondsElapsed: state.GameReducer.secondsElapsed,
    gameOverTimeLeft: state.GameReducer.gameOverTimeLeft,
    userQuit: state.GameReducer.userQuit,
    gameOver: state.GameReducer.gameOver,
    gameData: state.GameReducer.gameData,
    countPolygonsIdentified: state.GameReducer.countPolygonsIdentified,
    maxCountPolygons: state.GameReducer.maxCountPolygons,
    incorrectEntries: state.GameReducer.incorrectEntries,
    totalAttempts: state.GameReducer.totalAttempts,

    gameName: state.UserReducer.gameName

  }
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      quit: false,
      showMissingCountries: false,
      gameStart: false,
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
      zoom: 2,
      center: {
        lat: 30,
        lng: 31,
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
    map.data.loadGeoJson(
      'https://s3.amazonaws.com/gopher-geofiles/geogophers-world-countries.json');
    //set all loaded coordinate data to a red fill color with no stroke
    map.data.setStyle({
      fillColor: 'black',
      fillOpacity: '1',
      strokeColor: 'white',
      strokeWeight: '1'
    });
    //build game instance in redux
    this.props.dispatch(
      initializeNewGame(
        'https://s3.amazonaws.com/gopher-geofiles/geogophers-world-countries.json'
      )
    );

  }
  //on quit, set change game state and clear timer
  handleQuit() {
    this.setState({
      quit: true,
      gameOver : true });
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
            submitCorrectAnswer(
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
        <div className="time-elapsed-title">
          <h1>
            Time Remaining:
          </h1>
        </div>

        <h1 className="time-elapsed">
          {this.props.secondsElapsed}
        </h1>

        <h1 className="countries-answered">
          Countries Answered: {this.props.countPolygonsIdentified}/{this.props.maxCountPolygons}
        </h1>

        {this.isEnd()}

        <Button className="quit-game-btn" onClick={this.handleQuit}>Quit Game</Button>
        {
          this.state.quit ?
          <GameOver onClose={ this.handleClose } open={this.props.gameOver}/>
          :
            null
        }
          <GameStart
            onClose={ this.handleClose }
            onStart={this.handleStart}
            open={this.state.gameStart}
          />

          <div className="page-header">
            <h1>Geogophers Test</h1>
            <Checkbox checked={this.state.showMissingCountries} onClick={ this.showMarkers }toggle />
          </div>

          <br></br>

          <input
            className="answer-input"
            ref={(input) => { this.nameInput = input; }}
            onChange={ this.onInputChange }
            onKeyDown={this.keyPress}
            value={ this.state.inputValue }>
          </input>

          <div className="maps" id="map"></div>
      </div>
      </div>
      );
  }
}
