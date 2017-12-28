export const buildGameData = (inputData) => {
  let gameDataInput = inputData.features;
  //map over inputCountryData and store as 'game data'
  let gameData = gameDataInput.map((el, idx) => {
    //set countryData to the properties of original data (this contains country names and country center)
    let countryData = el.properties;

    //declare new countryObject
    let outputCountryData = {
      id: el.id,
      polygonAnswered: false,
      polygonUnanswered: true,
      polygonSkipped: false,
      acceptedAnswers: [],
      polygonZoomLevel: el.properties.countryZoomLevel,
      polygonCenterCoords: el.properties.countryCenter,
      polygonCapitalName: el.properties.countryCapitalName,
      polygonCapitalCoords: el.properties.countryCapitalCenter,
    }
    //loop through all country names
    for (let key in countryData) {
      //excluding irrelevant keys
      if (key !== 'countryCapitalCenter' && key !== 'countryCapitalName' && key !== 'countryCenter' && key !== 'countryZoomLevel') {
        if (Array.isArray(countryData[key]) && countryData[key].length > 0) {
          outputCountryData.acceptedAnswers = outputCountryData.acceptedAnswers.concat(countryData[key]);
        }
        if (Object.prototype.toString.call(countryData[key]) === '[object String]') {
          outputCountryData.acceptedAnswers.push(countryData[key]);
        }
      }
    }
    //store new country object in country data
    return outputCountryData;
  })

  return gameData;
}

//INPUT
// commonCountryNames:[]
// countryCapitalCenter: [24.65, 46.7]
// countryCapitalName:"riyadh"
// countryCenter:(2) [25, 45]
// countryZoomLevel:4
// formerCountryNames:["saudia"]
// initializedCountryNames:["ksa"]
// officialCountryName:"kingdom of saudi arabia"
// primaryCountryName:"saudi arabia"

//OUTPUT
// id, //fetches id from hostedJSON
// polygonAnswered, //is false at gamestart,
// polygonUnanswered, //is true at gamestart,
// polygonSkipped, //is false at gamestart
// acceptedAnswers, //flattens polygon names into a
//                  //single array
// polygonZoomLevel //fetches from hostedJSON
// polygonCenterCoords, //fetches from hostedJSON
// polygonCapitalName, //fetches from hostedJSON
// polygonCapitalCoords, //fetches from hostedJSON
