/*global window.google*/
import React from 'react';
import { Button, Checkbox } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sanitizeInput } from '../utils/answerSanitize';
import { checkAnswer } from '../utils/checkAnswerInputted';
import { toggleMissingCountries } from '../utils/toggleMissingCountries';
import {
  initializeNewGame,
  submitCorrectAnswer,
  submitIncorrectEntry,
  decrementTime,
  startGame,
  incrementTotalAttempts,
} from '../actions/Game.actions';



let map;

@connect((store) => {
  return {
    secondsElapsed: store.GameReducer.secondsElapsed,
    gameOverTimeLeft: store.GameReducer.gameOverTimeLeft,
    userQuit: store.GameReducer.userQuit,
    gameStart: store.GameReducer.gameStart,
    gameOver: store.GameReducer.gameOver,
    gameData: store.GameReducer.gameData,
    countPolygonsIdentified: store.GameReducer.countPolygonsIdentified,
    maxCountPolygons: store.GameReducer.maxCountPolygons,
    incorrectEntries: store.GameReducer.incorrectEntries,
    totalAttempts: store.GameReducer.totalAttempts,
  }
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      secondsElapsed: 30000,
      quit: false,
      showMissingCountries: false,
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
        lng: 31
      },
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      },
      streetViewControl: false,
      mapTypeControl: false,
      mapTypeId: 'roadmap',
      //turn off all country names and labels
      styles: [
        {
          featureType: "all",
          elementType: "labels",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: "#5F9EA0",
                fillOpacity: '0.5'

              }
            ]
          }
      ]
    });
    //load in coordinate data with country name information
    map.data.loadGeoJson(
      'https://s3.amazonaws.com/gopher-geofiles/geogophers-mvp-world-countries.json');
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
        'https://s3.amazonaws.com/gopher-geofiles/geogophers-mvp-world-countries.json'
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
      this.props.dispatch(
        startGame(this.props.gameStart)
      );
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
    if(e.keyCode == 13){
        let answerInputted = e.target.value;
        this.setState({inputValue: ''});
        let answerSanitized = sanitizeInput(answerInputted);
        let answerResponse = checkAnswer(answerSanitized, this.props.gameData);

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
            open={this.props.gameStart}
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
