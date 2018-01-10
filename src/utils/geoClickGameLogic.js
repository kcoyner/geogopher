import { getRandomUnansweredPolygon } from './getRandomUnansweredPolygon';
import { capitalizeWords } from './capitalizeFirst';
import {
  incrementTotalSubmissions,
  submitCorrectEntry,
  submitIncorrectEntry,
  submitSkippedEntry
} from '../actions/Score.actions';

const imgFromAssets = require('-!file-loader?name=markerImg!../assets/geogopher-marker.png');

/**
 * Game logic needed for geoclick type of game. Makes changes to the map.
 * @function geoClickGameLogic
 * @param { Object } gameValues
 * @param { Object } highlightedCountry
 * @param skipCountry
 */
export const geoClickGameLogic = async(gameValues, highlightedCountry, skipCountry) => {
  //declare logic variables
  let entryIncorrect = gameValues.refs.entry_incorrect;
  let entryCorrect = gameValues.refs.entry_correct;
  let allowNextCountry = false;
  let moreCountriesLeft = false;
  let endGame = true;
  let featureName;


  if (skipCountry && !gameValues.skipInProgress) {

    //set global skipInProgress to true, to prevent double skips
    gameValues.reactThis.setState({
      skipInProgress: true
    });
    // play an incorrect sound
    entryIncorrect.play();
    //get the polygon inside the map by using the id
    let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id)
    //modify the colors of polygon in the map to be greyed out
    gameValues.map.data.overrideStyle(polygonInMap, {
      fillColor: 'grey',
      strokeColor: 'darkslategrey',
      strokeWeight: '2'
    })
    //instantiate new marker to hold info window
    let marker = new google.maps.Marker({
      map: gameValues.map,
      icon: imgFromAssets,
      draggable: false,
      animation: null,
      position: {
        lat: highlightedCountry.polygonCenterCoords[0],
        lng: highlightedCountry.polygonCenterCoords[1]
      }
    })
    // instantiate an info window to contain the name of the country being skipped
    let infoWindow = new google.maps.InfoWindow();
    //build content inside the info window and open
    infoWindow.setContent(`<div class='polygon-info-window'> ${capitalizeWords(highlightedCountry.acceptedAnswers[0])} </div>`);
    infoWindow.open(gameValues.map, marker);
    // close the marker after it displays in setInterval for like 2 seconds
    await closeMarker(infoWindow, marker)
    //dispatch gameData to show TRUE for polygonAnswered, but not increment countPolygonsEntered
    gameValues.dispatchFcn(
      submitSkippedEntry(
        highlightedCountry.id,
        gameValues.gameData
      )
    )
    google.maps.event.clearInstanceListeners(gameValues.map.data);

    gameValues.reactThis.setState({skipInProgress: false});


  } else if (!skipCountry && !gameValues.skipInProgress){
    gameValues.gameData.map((polygon) => {
      if (polygon.polygonUnanswered) {
        endGame = false;
      }
    })

    //end game if the above map does not contain unanswered polygons
    if (endGame) {
      gameValues.handleGameEnd();
      return;
    }

    getRandomUnansweredPolygon(gameValues.gameData, (highlightedCountry) => {

      //add hover listeners to help user know they are hoving over a polygon selection
      gameValues.map.data.addListener('mouseover', (event) => {
        gameValues.map.data.overrideStyle(event.feature, {
          strokeWeight: '4'
        })
      })
      gameValues.map.data.addListener('mouseout', (event) => {
        gameValues.map.data.overrideStyle(event.feature, {
          strokeWeight: '2'
        })
      })
      //set polygon name to render
      gameValues.reactThis.setState({
        geoClickPolygonDisplay: highlightedCountry.acceptedAnswers[0]
      })
      gameValues.reactThis.setState({
        highlightedPolygon: highlightedCountry
      })
      //create click listener
      gameValues.map.data.addListener('click', (event) => {
        if (gameValues.gameSelected.indexOf("Countries") > -1) {
          featureName = event.feature.f.primaryCountryName
        } else {
          featureName = event.feature.f.countryCapitalName
        }
        //if name of polygon clicked is same as highlighted country
        if (featureName === highlightedCountry.acceptedAnswers[0]) {
          //change polygon colors
          gameValues.map.data.overrideStyle(event.feature, {
            fillColor: '#7FF000',
            strokeColor: '#008000',
            strokeWeight: '2'
          })
          // play a correct sound
          entryCorrect.play();
          //submit correct entry
          gameValues.dispatchFcn(
            submitCorrectEntry(
              gameValues.countPolygonsEntered,
              highlightedCountry.id,
              gameValues.gameData
            )
          )
          //remove all listeners on correct entry. new listeners will be created for the next polygon
          google.maps.event.clearInstanceListeners(gameValues.map.data);
        } else {
          entryIncorrect.play();
        }
      })
    //end callback for getRandomUnansweredPolygon
    })
  }
//end geoClickGameLogic
}

/**
 * Closes an informational marker after being displayed for a few seconds.
 * @function closeMarker
 * @param  infoWindow
 * @param  marker
 */
const closeMarker = (infoWindow, marker) => {
  return new Promise(resolve => {
    setTimeout(() => {
      infoWindow.close();
      marker.setMap(null);
      resolve();
    }, 2000)
  })
}
