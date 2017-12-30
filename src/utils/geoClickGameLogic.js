



export const geoClickGameLogic = (gameValues, highlightedCountry, skipCountry) => {

  if (!highlightedCountry) {
    getRandomUnansweredPolygon(gameValues.gameData, (highlightedCountry) => {
      this.setState({geoClickPolygonDisplay: highlightedCountry.acceptedAnswers[0]})

    //end callback for getRandomUnansweredPolygon
    })
  //end if statement whether highlightedCountry exists
  }


}
