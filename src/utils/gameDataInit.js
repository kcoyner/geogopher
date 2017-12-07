export const buildGameData = (inputData) => {
  let gameDataInput = inputData.features;

  let gameData = gameDataInput.map((el, idx) => {
    let countryData = el.properties;
    let outputCountryData = {
      index: idx,
      polygonAnswered: false,
      acceptedAnswers: [],
    }
    for (let key in countryData) {

      if (Array.isArray(countryData[key]) && countryData[key].length > 0) {
        outputCountryData.acceptedAnswers = outputCountryData.acceptedAnswers.concat(countryData[key]);
      }
      if (Object.prototype.toString.call(countryData[key]) === '[object String]') {
        outputCountryData.acceptedAnswers.push(countryData[key]);
      }
    }

    return outputCountryData;
  })

  let outputGameData = {
    gameName: null,
    gameData: gameData,
    gameDifficulty: null,
    startTime: 30000, //calculate this later
    endTime: 0,
    timeTaken: 0,
    maxCountPolygons: gameData.length,
    countPolygonsIdentified: 0,
    userName: null,
    entriesMissed: [],
  }

  return outputGameData;
}
