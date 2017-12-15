export const getRandomUnansweredPolygon = (gameData) => {
  let randomPolygon = gameData[Math.floor(Math.random()*gameData.length)];

  if (!randomPolygon.polygonAnswered){
    return randomPolygon
  } else {
    getRandomUnansweredPolygon(gameData)
  }

}
