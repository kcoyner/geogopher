/**
 * Callback to get a random polygon that has not been answered.
 * @module getRandomUnansweredPolygon
 * @param { Object[] } gameData - an array of polygons needed to play the game
 * @param { callback } callback - the polygon (aka country) we wish to highlight
 * @returns { Object } randomPolygon - a random polygon that has not been answered
 */

export const getRandomUnansweredPolygon = (gameData, callback) => {

  const fetchRandomUnanswered = (gameData) => {
    let randomPolygon = gameData[Math.floor(Math.random() * gameData.length)];

    if (randomPolygon.polygonAnswered) {
      fetchRandomUnanswered(gameData);
    } else {
      console.log('THIS IS THE RANDOM POLYGON');
      console.log(randomPolygon);
      callback(randomPolygon);
    }
  };

  fetchRandomUnanswered(gameData);
};
