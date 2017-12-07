export const checkAnswer = (answerInput, gameData) => {
  //loop through gamedata array
  for (var i = 0; i < gameData.length; i++) {
    //loop through accepted answers within country obj
    for (var j = 0; j < gameData[i].acceptedAnswers.length; j++) {
      // if answer matches
      if (answerInput === gameData[i].acceptedAnswers[j]) {
        // if the answer has already been input
        if (gameData[i].acceptedAnswers[j].polygonAnswered) {
          return ['answered', gameData[i].id]
        } else {
          return ['unanswered', gameData[i].id]
        }
      }
    }
  }
  return ['mistake', answerInput]
}
