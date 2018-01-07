"use strict";

/*global window.google*/
import React from 'react';
import { withRouter } from "react-router-dom";
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

let explore;

@connect((state) => {

  if(!state) {

  return {
      userName: state.UserReducer.user.username,
      userID: state.UserReducer.user.user_id,
      countGamesPlayed: state.UserReducer.count_games_played,
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
      // TODO: in the user login routines, we need to take t
  }

} else {
  return {};
}


})

class Explore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      someState: 'EXPLORE',
    }

  }


  async componentDidMount() {

    // //initialize new google map and place it on '#map'
    // map = new window.google.maps.Map(document.getElementById('map'), {
    //   zoom: this.props.gameZoom,
    //   center: {
    //     lat: this.props.gameCenterCoords[0],
    //     lng: this.props.gameCenterCoords[1],
    //   },
    //   zoomControl: true,
    //   zoomControlOptions: {
    //     position: window.google.maps.ControlPosition.RIGHT_CENTER
    //   },
    //   streetViewControl: false,
    //   mapTypeControl: false,
    //   mapTypeId: 'roadmap',
    //   //turn off all country names and labels
    //   styles: mapDetails
    // });
    // //load in coordinate data with country name information
    // map.data.loadGeoJson(this.props.gameJSON);
    // //set all loaded coordinate data to a red fill color with no stroke
    // map.data.setStyle({
    //   fillColor: 'firebrick',
    //   fillOpacity: '.6',
    //   strokeColor: 'orange',
    //   strokeWeight: '2'
    // });
    // //build gameData in redux and stores as this.props.gameData
    // if (this.props.gameSelected.indexOf('Capitals') > -1) {
    //   await this.props.dispatch(
    //     actions.initializeNewGame(this.props.gameJSON, 'Capitals')
    //   );
    //
    // } else {
    //
    //   await this.props.dispatch(
    //     actions.initializeNewGame(this.props.gameJSON, 'Countries')
    //   );
    //
    // }

  }


  render() {
    return (
      <div> {this.state.someState} </div>

    );
    // end render
    }
//end class constructor
}

export default withRouter(Explore);
