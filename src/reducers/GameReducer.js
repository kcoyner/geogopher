export default function reducer(state = {
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
    //not yet used, possibly not necessary
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
    //called in gameslist when user clicks on a game
    case 'GAME_SELECTED':
      return {
        ...state,
        gameSelected: action.payload.gameSelected,
        gameJSON: action.payload.gameJSON,
        gameCenterCoords: action.payload.gameCenterCoords,
        gameZoom: action.payload.gameZoom,
        maxCountPolygons: action.payload.maxCountPolygons,
      };
    //called in gamesettings when user selects game type
    case 'GAME_TYPE_SELECTED':
      return {
        ...state,
        gameTypeSelected: action.payload.gameTypeSelected,
      };
    //called in gamesettings when user selects game difficulty
    case 'GAME_DIFFICULTY_SELECTED':
      return {
        ...state,
        gameDifficultySelected: action.payload.gameDifficultySelected,
      };
    //called in map on componentDidMount, action initializeNewGame
    //passes gameData here
    case 'GAME_DATA_BUILT':
      return {
        ...state,
        gameData: action.payload
      };
    //called in map jsx and is due to be extracted to a game logic
    case 'ANSWER_CORRECT':
      return {
        ...state,
        gameData: action.payload.gameData,
        countPolygonsEntered: action.payload.countPolygonsEntered,
      };

    //called in map jsx and is due to be extracted to a game logic
    case 'ANSWER_INCORRECT':
      return {
        ...state,
        incorrectEntries: action.payload.incorrectEntries,
      };

    //called in map jsx and is due to be extracted to a game logic
    case 'DECREMENT_TIME':
      return {
        ...state,
        secondsElapsed: action.payload.secondsElapsed,
      };

    //called in map jsx and is due to be extracted to a game logic
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
