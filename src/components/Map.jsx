/*global window.google*/
import React from 'react';
import { Button } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initializeNewGame, submitCorrectAnswer } from '../actions/Game.actions';
import { sanitizeInput } from '../utils/answerSanitize';
import { checkAnswer } from '../utils/checkAnswerInputted';



let map;

@connect((store) => {
  return {
    startTime: store.GameReducer.startTime,
    endTime: store.GameReducer.endTime,
    gameData: store.GameReducer.gameData,
    countPolygonsIdentified: store.GameReducer.countPolygonsIdentified,
    maxCountPolygons: store.GameReducer.maxCountPolygons,
    entriesMissed: store.GameReducer.entriesMissed,
    totalAttempts: store.GameReducer.totalAttempts,
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
        let answerSanitized = sanitizeInput(answerInputted);
        let answerResponse = checkAnswer(answerSanitized, this.props.gameData);
        console.log('answerResponse')
        console.log(answerResponse)
        if (answerResponse[0] === 'mistake') {
          //dispatch and add to mistakes
      } else if (answerResponse[0] === 'unanswered') {
        //modify polygon fillColor
        let polygon = map.data.getFeatureById(answerResponse[1])
        console.log(polygon)
        map.data.overrideStyle(polygon, {fillColor: 'green'})
        //dispatch to modify store
        this.props.dispatch(submitCorrectAnswer(this.props.countPolygonsIdentified, answerResponse[1], this.props.gameData))
      }

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
            className="answer-input"
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
