export const buildPolygonResults = (gameData) => {
  //declare a clean output object for the score action/reducer to store
  let polygons = {
    answered: [],
    unanswered: [],
    skipped: [],
  };
  //iterate through gameData once user invokes 'handleGameEnd'
  gameData.forEach((el) => {
    //declare object to hold name, id, and country center only
    let individualPolygon = {
      name: el.acceptedAnswers[0],
      coords: el.countryCenter,
      id: el.id,
    }
    //build answered/unanswered arrays based on gameData's polygonAnswered status
    if (el.polygonAnswered) {
      //only store first name which is 'primaryCountryName'
      polygons.answered.push(individualPolygon);
    } else if (el.polygonSkipped){
      polygons.skipped.push(individualPolygon);
    } else {
      polygons.unanswered.push(individualPolygon);
    }
  })

  return polygons
}
