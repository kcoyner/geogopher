import { getRandomUnansweredPolygon } from './index'

import { submitCorrectEntry, submitIncorrectEntry, incrementTotalSubmissions, submitSkippedEntry } from '../actions/Score.actions';

/**
 * Game logic needed for nameTheCountry type of game. Makes changes to the map.
 * @function nameTheCountryGameLogic
 * @param gameValues
 * @param { Object } highlightedCountry
 */
export const nameTheCountryGameLogic = (gameValues, highlightedCountry, skipCountry) => {

  //if a highlighted country has not been passed in, then it came from Map's handleStart
  if (!highlightedCountry) {

    // invoking the callback function
    getRandomUnansweredPolygon(gameValues.gameData, function(highlightedCountry) {

      // set the zoom (probably need to fix this at some point)
      gameValues.map.setZoom(6);

      // set the map center to the coordinates of the randomly selected polygon
      gameValues.map.setCenter({
        lat: highlightedCountry.countryCenter[0],
        lng: highlightedCountry.countryCenter[1]
      });

      // get the polygon in the map
      let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id);

      //modify the colors of polygon in the map
      gameValues.map.data.overrideStyle(polygonInMap, {
        fillColor: '#00FFFF',
        strokeColor: '#FFD700',
        strokeWeight: '3'
      });

      //set state to keep highlighted polygon in global scope
      gameValues.reactThis.setState({
        highlightedPolygon: highlightedCountry
      });
    });

  } else {

    //declare logic variables
    let allowNextCountry = false;
    let moreCountriesLeft = false

    //if user is skipping the country
    if (skipCountry) {

      let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id)
      //modify the colors of polygon in the map
      gameValues.map.data.overrideStyle(polygonInMap, {
        fillColor: 'grey',
        strokeColor: 'darkslategrey',
        strokeWeight: '3'
      })
      //dispatch gameData to show TRUE for polygonAnswered, but not increment countPolygonsEntered
      gameValues.dispatchFcn(
        submitSkippedEntry(
          highlightedCountry.id,
          gameValues.gameData
        )
      )

      //set answer status to correct
      allowNextCountry = true;

    } else {

      //if a highlightedCountry does exist and user isnt skipping entry, loop through its accepted answers
      highlightedCountry.acceptedAnswers.forEach((el) => {
        //if user input matches an acceptable answer
        if (gameValues.submissionSanitized === el) {
          //get the polygon in the map
          let polygonInMap = gameValues.map.data.getFeatureById(highlightedCountry.id)
          //modify the colors of polygon in the map
          gameValues.map.data.overrideStyle(polygonInMap, {
            fillColor: '#7FF000',
            strokeColor: '#FFD700',
            strokeWeight: '3'
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
          //end of if statement that matches submission to accepted answer
        }
        //end of forEach that cycles through accepted answers
      })


    }




    if (allowNextCountry) {
      //if there are more unansweredPolygons, run function again
      gameValues.gameData.forEach((el) => {
        if (!el.polygonAnswered) {
          moreCountriesLeft = true;
        }
      })

      moreCountriesLeft ? nameTheCountryGameLogic(gameValues) : gameValues.handleGameEnd();
    } else {
      //dispatch incorrect submitincorrect entry
      gameValues.dispatchFcn(
        submitIncorrectEntry(
          gameValues.submissionSanitized,
          gameValues.incorrectEntries
        )
      )
    }


  //end of else statement
  }


//end of body function
}
