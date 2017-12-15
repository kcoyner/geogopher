export default function reducer(state = {
    userID: null,
    gameID: null,
    gameTypeID: null,
    gameDifficultyID: null,
    countPolygonsEntered: null,
    countTotalSubmissions: null,
    polygonsAnswered: null,
    polygonsUnanswered: null,
    incorrectEntries: null,
    gameTimerStart: null,
    gameTimerRemaining: null,
    gameStartTimestamp: null,
    gameEndTimestamp: null,
    ipWhereGamePlayed: null,
  },
  action) {
  switch (action.type) {
    case 'SET_GAME_ID':
      return {
        ...state,
        gameID: action.payload.gameID,
      };



    case 'ANSWER_CORRECT':
      return {
        ...state,
        gameData: action.payload.gameData,
        countPolygonsIdentified: action.payload.countPolygonsIdentified,
      };

    case 'ANSWER_INCORRECT':
      return {
        ...state,
        incorrectEntries: action.payload.incorrectEntries,
      };

    case 'DECREMENT_TIME':
      return {
        ...state,
        secondsElapsed: action.payload.secondsElapsed,
      };

    case 'INCREMENT_TOTAL_ATTEMPTS':
      return {
        ...state,
        totalAttempts: action.payload.totalAttempts,
      };

  //end switch
  }
  return state;
  //end function body
}
