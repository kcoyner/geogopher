/*global window.google*/
import React from 'react';
import { Button } from 'semantic-ui-react';
import GameStart from './GamesStart';
import GameOver from './GameOver';

let map;

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

    map.data.loadGeoJson(
      'https://s3.amazonaws.com/gopher-geofiles/geogophers-mvp-world-countries.json');
    map.data.setStyle({
      fillColor: 'red',
      strokeWeight: '0'
    });

    this.nameInput.focus();
  }
  handleQuit() {
    this.setState({
      quit: true,
      gameOver : true });
    clearInterval(this.incrementer);
  }
  handleStart() {
        this.nameInput.focus();
        this.setState({ gameStart: false });
        this.incrementer = setInterval( () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed - 1
        })
      , 1000);
    }
  handleClose(){
    this.setState({ open: false });
    this.props.history.push('/');
  }

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value
    })
  }
  isEnd() {
    if(this.state.secondsElapsed === 0) {
      clearInterval(this.incrementer);
      return <GameOver onClose={ this.handleClose } open={this.state.gameOver}/>
    }
  }
  keyPress(e) {
    if(e.keyCode == 13){
        let answerInputted = e.target.value;
        this.setState({inputValue: ''});
         map.data.forEach(function(feature) {
           if (feature.getProperty('primaryCountryName') === answerInputted) {
             map.data.overrideStyle(feature, {
               fillColor: 'green'
             })
           }
         })
      }
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
