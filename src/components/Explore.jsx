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
const imgFromAssets = require('-!file-loader?name=markerImg!../assets/geogopher-marker.png');

let map;
let markers = [];
let clickListener;

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
    this.state = {}
    this.clearMarkers = this.clearMarkers.bind(this)
  }

  async componentDidMount() {

    if (this.props.polygonsAnswered.length > 1 || this.props.polygonsUnanswered.length > 1 || this.props.polygonsSkipped.length > 1) {
      
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

      //load previous game GeoJSON then load game results
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


        //add mouseover listener to increase stroke on hover and create a click listener
        map.data.addListener('mouseover', (event) => {
            map.data.overrideStyle(event.feature,
              {
                strokeWeight: '4'
              })

            clickListener = map.data.addListener('click',  (event) => {
              //onclick create a marker and infowindow
              let marker = new google.maps.Marker({
                map: map,
                icon: imgFromAssets,
                draggable: false,
                animation: null,
                position: { lat: event.feature.f.countryCenter[0], lng: event.feature.f.countryCenter[1] }
              })

             let infoWindow = new google.maps.InfoWindow();
                //build content inside the info window and open
                infoWindow.setContent(
                  `<div class='polygon-explore-window'>
                    <strong>Country:</strong> ${capitalizeWords(event.feature.f.primaryCountryName)}
                    <br>
                    <strong>Capital:</strong> ${capitalizeWords(event.feature.f.countryCapitalName)}
                  </div>`
                );
              //display infowindow and add marker to global markers array
              infoWindow.open(map, marker);
              markers.push(marker);
            })

        });
        //end geoJSON callback
      })


      //add mouseout listener to remove click listener, clear markers and return stroke weight
      map.data.addListener('mouseout', (event) => {
          map.data.overrideStyle(event.feature,
            {
              strokeWeight: '2'
            })

            google.maps.event.removeListener(clickListener);

            this.clearMarkers();
      })




    } else {

        //initialize generic map without any previous game data
        map = new window.google.maps.Map(document.getElementById('explore-map'), {
          zoom: 3,
          center: { lat: 30, lng: 31 },
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

        //load geoJSON for world map
        map.data.loadGeoJson('https://s3.amazonaws.com/gopher-geofiles/geogophers-world-countries.json', "",(features) => {

          map.data.setStyle({
            fillColor: '#f5f5f5',
            fillOpacity: '0',
            strokeColor: '#616161',
            strokeWeight: '1'
          });

          //this is repeat code from above conditional to provide same functionality.
          //TODO: factor this out

          map.data.addListener('mouseover', (event) => {
              map.data.overrideStyle(event.feature,
                {
                  strokeWeight: '4'
                })

              clickListener = map.data.addListener('click',  (event) => {

                let marker = new google.maps.Marker({
                  map: map,
                  icon: imgFromAssets,
                  draggable: false,
                  animation: null,
                  position: { lat: event.feature.f.countryCenter[0], lng: event.feature.f.countryCenter[1] }
                })
                // instantiate an info window to contain the name of the country being skipped
               let infoWindow = new google.maps.InfoWindow();
                  //build content inside the info window and open
                  infoWindow.setContent(
                    `<div class='polygon-explore-window'>
                      <strong>Country:</strong> ${capitalizeWords(event.feature.f.primaryCountryName)}
                      <br>
                      <strong>Capital:</strong> ${capitalizeWords(event.feature.f.countryCapitalName)}
                    </div>`
                  );
                  infoWindow.open(map, marker);

                  markers.push(marker);
              })

            });

          })

          map.data.addListener('mouseout', (event) => {
              map.data.overrideStyle(event.feature, { strokeWeight: '2' })
              google.maps.event.removeListener(clickListener);
              this.clearMarkers();
          })
    //end of conditional that checks whether there is game data
    }
  //end of componentDidMount
  }

  clearMarkers() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
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
