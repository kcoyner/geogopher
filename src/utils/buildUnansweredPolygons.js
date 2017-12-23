export const buildUnansweredPolygons = (gameData) => {
  let unansweredPolygons = gameData.map((el) => {
    let individualPolygon = {
      name: el.acceptedAnswers[0],
      coords: el.countryCenter,
      id: el.id,
    }
    return individualPolygon;
  })
  return unansweredPolygons
}
