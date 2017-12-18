export default function reducer(state = {
    userID: null,
    gameID: null,
    gameTypeID: null,
    gameDifficultyID: null,
    countPolygonsEntered: 0,
    countTotalSubmissions: 0,
    polygonsAnswered: [],
    polygonsUnanswered: [],
    incorrectEntries: [],
    gameTimerStart: null,
    gameTimerRemaining: null,
    gameStartTimestamp: null,
    gameEndTimestamp: null,
    ipWhereGamePlayed: null,
  },
  action) {
  switch (action.type) {

    case 'RESET_SCORE':
      return {
        userID: null,
        gameID: null,
        gameTypeID: null,
        gameDifficultyID: null,
        countPolygonsEntered: 0,
        countTotalSubmissions: 0,
        polygonsAnswered: [],
        polygonsUnanswered: [],
        incorrectEntries: [],
        gameTimerStart: null,
        gameTimerRemaining: null,
        gameStartTimestamp: null,
        gameEndTimestamp: null,
        ipWhereGamePlayed: null,
      }

    case 'SET_GAME_ID':
      return {
        ...state,
        gameID: action.payload.gameID,
      };
    case 'SET_GAME_TYPE_ID':
      return {
        ...state,
        gameTypeID: action.payload.gameTypeID,
      };
    case 'SET_GAME_DIFFICULTY_ID':
      return {
        ...state,
        gameDifficultyID: action.payload.gameDifficultyID,
      };
    case 'SET_TIMER':
      return {
        ...state,
        gameTimerStart: action.payload.gameTimerStart,
        gameTimerRemaining: action.payload.gameTimerRemaining,
      };
    case 'SET_GAME_START_TIMESTAMP':
      return {
        ...state,
        gameStartTimestamp: action.payload.gameStartTimestamp,
      };
    case 'SET_GAME_END_TIMESTAMP':
      return {
        ...state,
        gameEndTimestamp: action.payload.gameEndTimestamp,
      };

    case 'ANSWER_CORRECT':
      return {
        ...state,
        gameData: action.payload.gameData,
        countPolygonsEntered: action.payload.countPolygonsEntered,
      };

    case 'ANSWER_INCORRECT':
      return {
        ...state,
        incorrectEntries: action.payload.incorrectEntries,
      };

    case 'DECREMENT_TIME':
      return {
        ...state,
        gameTimerRemaining: action.payload.gameTimerRemaining,
      };

    case 'INCREMENT_TOTAL_SUBMISSIONS':
      return {
        ...state,
        countTotalSubmissions: action.payload.countTotalSubmissions,
      };

  //end switch
  }
  return state;
  //end function body
}
