/*global window.google*/
import React from 'react';
import { Button } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initializeNewGame} from '../actions/NewGame.actions';


let map;

@connect((store) => {
  return {
    gameData: store.NewGameReducer.gameData
  }
})

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      gameOver: true,
      gameStart: true,
      secondsElapsed: 30000,
      quit: false,
    }
    this.incrementer = null;
    this.onInputChange = this.onInputChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleQuit = this.handleQuit.bind(this);
    this.isEnd = this.isEnd.bind(this);
    this.keyPress = this.keyPress.bind(this);
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
        }
      ]
    });
    //load in coordinate data with country name information
    map.data.loadGeoJson(
      'https://s3.amazonaws.com/gopher-geofiles/geogophers-mvp-world-countries.json');
    //set all loaded coordinate data to a red fill color with no stroke
    map.data.setStyle({
      fillColor: 'darkred',
      fillOpacity: '0.8',
      strokeColor: 'black',
      strokeWeight: '1'
    });

    this.props.dispatch(initializeNewGame('https://s3.amazonaws.com/gopher-geofiles/geogophers-mvp-world-countries.json'));

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
        this.setState({ gameStart: false });
        this.incrementer = setInterval( () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed - 1
        })
      , 1000);
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
        let answerSanitized;
        //-------start basic sanitization:--------

        //if text has multiple words
        if (answerInputted.indexOf(' ') > -1) {
          answerInputted = answerInputted.split(' ');
          answerSanitized = answerInputted.map(function(el, idx) {
            return el.toLowerCase();
          });
          answerSanitized = answerSanitized.join(' ');
          console.log(answerSanitized);
        // if text is one word
        } else if (answerInputted.indexOf(' ') === -1) {
          answerInputted = answerInputted.split('');
          console.log('entered last if')
          answerSanitized = answerInputted.map(function(el, idx) {
            return el.toLowerCase();
          });
          answerSanitized = answerSanitized.join('');
          console.log(answerSanitized);
        }

        //if text has .
        if (answerSanitized.indexOf('.') > -1) {
          answerSanitized = answerSanitized.split('');
          console.log(answerSanitized)
          answerSanitized = answerSanitized.map(function(el) {
            if (el !== '.')
            return el
          });
          answerSanitized = answerSanitized.join('');
          console.log(answerSanitized);
        }

       //loop game data (before redux implementation)
       map.data.forEach(function(feature) {
         //check for primary names
         if (feature.getProperty('primaryCountryName') === answerSanitized) {
           map.data.overrideStyle(feature, {
             fillColor: 'green'
           })
         }
         //check common names
         if (feature.getProperty('commonCountryNames').length > 0) {
           feature.getProperty('commonCountryNames').forEach((commonCountryName) => {
             if (commonCountryName === answerSanitized)
               map.data.overrideStyle(feature, {
                 fillColor: 'green'
               })
           })
         }
         //check official name
         if (feature.getProperty('officialCountryName') === answerSanitized) {
            map.data.overrideStyle(feature, {
              fillColor: 'green'
            })
         }
         //check initialized names
         if (feature.getProperty('initializedCountryNames').length > 0) {
           feature.getProperty('initializedCountryNames').forEach((initializedCountryName) => {
             if (initializedCountryName === answerSanitized)
             map.data.overrideStyle(feature, {
               fillColor: 'green'
             })
           })
         }
         //check former names
         if (feature.getProperty('formerCountryNames').length > 0) {
           feature.getProperty('formerCountryNames').forEach((formerCountryName) => {
             if (formerCountryName === answerSanitized)
             map.data.overrideStyle(feature, {
               fillColor: 'green'
             })
           })
         }
         //-------end basic sanitization--------

        //end initial map.data.forEach
       })
      //end keystroke if statement
      }
  //end keypress function
  }

  render() {
    return (
      <div className="container">
        <div className="game-controls">
        <h1>{this.state.secondsElapsed}</h1>
        {this.isEnd()}
        <Button onClick={this.handleQuit}>Quit Game</Button>
        {
          this.state.quit ?
          <GameOver onClose={ this.handleClose } open={this.state.gameOver}/> :
            null
        }
          <GameStart
            onClose={ this.handleClose }
            onStart={this.handleStart}
            open={this.state.gameStart}
          />

          <div className="page-header">
            <h1>Geogophers Test</h1>
          </div>

          <br></br>

          <input
            ref={(input) => { this.nameInput = input; }}
            onChange={ this.onInputChange }
            onKeyDown={this.keyPress}
            value={ this.state.inputValue }>
          </input>

      </div>
        <div className="maps" id="map"></div>
      </div>
      );
  }
}
