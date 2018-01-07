"use strict";

/*global window.google*/
import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';
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
      // TODO: in the user login routines, we need to take t
  }




})

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }

  }


  async componentDidMount() {

    if (this.props.gameCenterCoords) {

    map = new window.google.maps.Map(document.getElementById('explore-map'), {
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


    map.data.loadGeoJson(this.props.gameJSON, "",(features) => {
        this.props.polygonsAnswered.forEach((el)=>{
          map.data.overrideStyle(map.data.getFeatureById(el.id), {
            fillColor: '#7FF000',
            strokeColor: '#008000',
            strokeWeight: '2'
          })
        })
        this.props.polygonsSkipped.forEach((el)=>{
          map.data.overrideStyle(map.data.getFeatureById(el.id), {
            fillColor: 'grey',
            strokeColor: 'darkslategrey',
            strokeWeight: '2'
          })
        })
        this.props.polygonsUnanswered.forEach((el)=>{
          map.data.overrideStyle(map.data.getFeatureById(el.id), {
            fillColor: 'firebrick',
            fillOpacity: '.6',
            strokeColor: 'orange',
            strokeWeight: '2'
          })
        })

    });




//end callback for loadGeoJson


  } else {
    console.log('no state detected')
        //initialize new google map and place it on '#map'
        map = new window.google.maps.Map(document.getElementById('explore-map'), {
          zoom: 3,
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




  }

  }


  render() {
    return (
      <div className="explore-container">

        <div
          className="explore-map"
          id="explore-map">
        </div>

      </div>

    );
    // end render
    }
//end class constructor
}

export default withRouter(Explore);
