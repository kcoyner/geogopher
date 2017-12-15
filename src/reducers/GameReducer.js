    // //pre game data
    // userName: 'SenecaTheYounger',
    // userID: 1,
    // countGamesPlayed: 10,
    // token: null,
    // lastLogin: null,
    //
    // //game settings
    // gameSelected: state.GameReducer.gameSelected,
    // gameJSON: state.GameReducer.gameJSON,
    // gameCenterCoords: state.GameReducer.gameCenterCoords,
    // gameZoom: state.GameReducer.gameZoom,
    // maxCountPolygons: state.GameReducer.maxCountPolygons,
    // gameTypeSelected: state.GameReducer.gameTypeSelected,
    // gameDifficultySelected: state.GameReducer.gameDifficultySelected,
    // gameData: state.GameReducer.gameData,
    //
    // //score data
    // countPolygonsEntered: state.ScoreReducer.countPolygonsEntered,
    // countTotalSubmissions: state.ScoreReducer.countTotalSubmissions,
    // polygonsAnswered: state.ScoreReducer.polygonsAnswered,
    // polygonsUnanswered: state.ScoreReducer.polygonsUnanswered,
    // incorrectEntries: state.ScoreReducer.incorrectEntries,
    // gameTimerStart: state.ScoreReducer.gameTimerStart,
    // gameTimerRemaining: state.ScoreReducer.gameTimerRemaining,
    // gameStartTimestamp: state.ScoreReducer.gameStartTimestamp,
    // gameEndTimestamp: state.ScoreReducer.gameEndTimestamp,
    // ipWhereGamePlayed: state.ScoreReducer.ipWhereGamePlayed,


export default function reducer(state = {
      secondsElapsed: 0,
      gameOverTimeLeft: -1,
      gameData: null,
      countPolygonsIdentified: 0,
      maxCountPolygons: null,
      incorrectEntries: [],
      totalAttempts: 0,
      gameSelected: null,
      gameJSON: null,
      gameCenterCoords: null,
      gameZoom: null,
      maxCountPolygons: null,
      gameTypeSelected: null,
      gameDifficultySelected: null,
      gameData: null,
  },
  action) {
  switch (action.type) {
    case 'CLEAR_GAME':
      return {
        ...state,
      gameSelected: null,
      gameJSON: null,
      gameCenterCoords: null,
      gameZoom: null,
      maxCountPolygons: null,
      gameTypeSelected: null,
      gameDifficultySelected: null,
      gameData: null,
      };

    case 'GAME_SELECTED':
      return {
        ...state,
        gameSelected: action.payload.gameSelected,
        gameJSON: action.payload.gameJSON,
        gameCenterCoords: action.payload.gameCenterCoords,
        gameZoom: action.payload.gameZoom,
        maxCountPolygons: action.payload.maxCountPolygons,
      };

    case 'GAME_TYPE_SELECTED':
      return {
        ...state,
        gameTypeSelected: action.payload.gameTypeSelected,
      };

    case 'GAME_DIFFICULTY_SELECTED':
      return {
        ...state,
        gameDifficultySelected: action.payload.gameDifficultySelected,
      };

    case 'GAME_DATA_BUILT':
      return {
        ...state,
        gameData: action.payload
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
