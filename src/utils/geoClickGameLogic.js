
import { getRandomUnansweredPolygon } from './getRandomUnansweredPolygon'
import { submitCorrectEntry, submitIncorrectEntry, incrementTotalSubmissions, submitSkippedEntry } from '../actions/Score.actions';

const imgFromAssets = require('-!file-loader?name=markerImg!../assets/geogopher-marker.png');

export const geoClickGameLogic = async (gameValues, highlightedCountry, skipCountry) => {

  //declare logic variables
  let allowNextCountry = false;
  let moreCountriesLeft = false;

      if (skipCountry) {
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
            position: { lat: highlightedCountry.polygonCenterCoords[0], lng: highlightedCountry.polygonCenterCoords[1] }
          })
          // instantiate an info window to contain the name of the country being skipped
         let infoWindow = new google.maps.InfoWindow();
            //build content inside the info window and open
            infoWindow.setContent("<div class='polygon-info-window'>" + highlightedCountry.acceptedAnswers[0] + "</div>");
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
        } else {

    getRandomUnansweredPolygon(gameValues.gameData,  (highlightedCountry) => {
      //set polygon name to render
      gameValues.reactThis.setState({geoClickPolygonDisplay: highlightedCountry.acceptedAnswers[0]})
      gameValues.reactThis.setState({highlightedPolygon: highlightedCountry})
      //create click listener
      gameValues.map.data.addListener('click',  (event) => {
        //if name of polygon clicked is same as highlighted country
        if (event.feature.f.primaryCountryName === highlightedCountry.acceptedAnswers[0]) {
          //change polygon colors
          gameValues.map.data.overrideStyle(event.feature,
            {
              fillColor: '#7FF000',
              strokeColor: '#008000',
              strokeWeight: '2'
            })
            //set allowNextCountry to true
            allowNextCountry = true;
            //submit correct entry
            console.log("INSIDE CALLBACK")
            console.log(gameValues.countPolygonsEntered)
            gameValues.dispatchFcn(
              submitCorrectEntry(
                gameValues.countPolygonsEntered,
                highlightedCountry.id,
                gameValues.gameData
              )
            )

            google.maps.event.clearInstanceListeners(gameValues.map.data);

        }

      })


    //end callback for getRandomUnansweredPolygon
    })
  }

//end geoClickGameLogic
}




const closeMarker = (infoWindow, marker) => {
  return new Promise (resolve => {
      setTimeout( () => {
      infoWindow.close();
      marker.setMap(null);
      resolve();
      }, 2000)
  })
}
