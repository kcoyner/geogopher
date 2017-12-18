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

  // let randomPolygon = gameData[Math.floor(Math.random() * gameData.length)];

  // if (!randomPolygon.polygonAnswered) {
  //   console.log('THIS IS THE RANDOM POLYGON');
  //   console.log(randomPolygon);
  //   callback(randomPolygon);
  // } else {
  //   getRandomUnansweredPolygon(gameData);
  // }

};
