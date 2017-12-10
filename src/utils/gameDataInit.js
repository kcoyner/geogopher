export const buildGameData = (inputData) => {
  let gameDataInput = inputData.features;
  //map over inputCountryData and store as 'game data'
  let gameData = gameDataInput.map((el, idx) => {
    //set countryData to the properties of original data (this contains country names and country center)
    let countryData = el.properties;
    //declare new countryObject
    let outputCountryData = {
      id: idx + 1,
      polygonAnswered: false,
      acceptedAnswers: [],
      countryCenter: el.properties.countryCenter
    }
    //loop through all country names
    for (let key in countryData) {
      //excluding country center coordinates
      if (key !== 'countryCenter') {
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
