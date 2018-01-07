import {
  getRandomUnansweredPolygon,
  capitalizeWords
} from './index'

import {
  submitCorrectEntry,
  submitIncorrectEntry,
  incrementTotalSubmissions,
  submitSkippedEntry
} from '../actions/Score.actions';

/**
 * Game logic needed for nameTheCountry type of game. Makes changes to the map.
 * @function nameTheCountryGameLogic
 * @param { Object } gameValues
 * @param { Object } highlightedCountry
 * @param skipCountry
 */
export const nameTheCountryGameLogic = async(gameValues, highlightedCountry, skipCountry) => {
  const imgFromAssets = require('-!file-loader?name=markerImg!../assets/geogopher-marker.png');
  let entryIncorrect = gameValues.refs.entry_incorrect;
  let entryCorrect = gameValues.refs.entry_correct;
  // if a highlighted country has not been passed in, then it came from Map's handleStart
  if (!highlightedCountry) {
    // a random polygon is returned from gameData, invoking cb using random polygon as 'highlightedCountry'
    getRandomUnansweredPolygon(gameValues.gameData, function(highlightedCountry) {
      // set the zoom (probably need to fix this at some point)
      gameValues.map.setZoom(highlightedCountry.polygonZoomLevel);
      // set the map center to the coordinates of the randomly selected polygon
      gameValues.map.panTo({
        lat: highlightedCountry.polygonCenterCoords[0],
        lng: highlightedCountry.polygonCenterCoords[1]
      });
      // get the polygon in the map
      let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id);
      //modify the colors of polygon in the map
      gameValues.map.data.overrideStyle(polygonInMap, {
        fillColor: 'aqua',
        strokeColor: 'fuchsia',
        strokeWeight: '4'
      });
      //set state to keep highlighted polygon in global scope
      gameValues.reactThis.setState({
        highlightedPolygon: highlightedCountry
      });
    });
  } else {
    //enter nameTheCountryGameLogic if there is a higlightedPolygon/Country passed in.
    //this means it came from the user hitting 'skip' or by typing something and hitting 'enter'
    //declare logic variables
    let allowNextCountry = false;
    let moreCountriesLeft = false
    //if user is skipping the country
    if (skipCountry) {
      //get the polygon inside the map by using the id
      let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id)
      //modify the colors of polygon in the map to be greyed out
      gameValues.map.data.overrideStyle(polygonInMap, {
        fillColor: 'grey',
        strokeColor: 'darkslategrey',
        strokeWeight: '2'
      })
      // play an incorrect sound
      entryIncorrect.play();
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
      await gameValues.dispatchFcn(
        submitSkippedEntry(
          highlightedCountry.id,
          gameValues.gameData
        )
      )
      // play incorrect sound
      entryIncorrect.play();
      //set answer status to correct
      allowNextCountry = true;
    } else {
      //if a highlightedCountry does exist and user isnt skipping entry,
      //loop through its accepted answers
      highlightedCountry.acceptedAnswers.forEach((el) => {
        //if user input matches an acceptable answer
        if (gameValues.submissionSanitized === el) {
          //get the polygon in the map
          let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id)
          // the the sound for a correct entry
          //modify the colors of polygon in the map
          gameValues.map.data.overrideStyle(polygonInMap, {
            fillColor: '#7FF000',
            strokeColor: '#008000',
            strokeWeight: '2'
          })
          //dispatch gameData to show TRUE for polygonsAnswered
          gameValues.dispatchFcn(
            submitCorrectEntry(
              gameValues.countPolygonsEntered,
              highlightedCountry.id,
              gameValues.gameData
            )
          )
          //set answer status to correct
          allowNextCountry = true;
          //make local modification to gameData
          gameValues.gameData.forEach((el) => {
            if (el.id === highlightedCountry.id) {
              el.polygonAnswered = true;
            }
          })
          // play correct sound
          entryCorrect.play();
        //end of if statement that matches submission to accepted answer
        }
      //end of forEach that cycles through accepted answers
      })
    //end of else where user has inputted an answer
    }
    //based on skip or answer input, check if game should move to
    //next country
    if (allowNextCountry) {
      //determine whether there are more countries left to answer
      gameValues.gameData.forEach((el) => {
        if (el.polygonUnanswered) {
          moreCountriesLeft = true;
        }
      })
      //if there are more unansweredPolygons, run function again, otherwise
      //invoke game end
      moreCountriesLeft ? nameTheCountryGameLogic(gameValues) : gameValues.handleGameEnd();
    } else {
      //if allowNextCountry is false, then answer input must be wrong
      //and dispatch submitincorrect entry
      gameValues.dispatchFcn(
        submitIncorrectEntry(
          gameValues.submissionSanitized,
          gameValues.incorrectEntries
        )
      )
      entryIncorrect.play();
    }
  //end of else statement
  }
//end of body function
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
