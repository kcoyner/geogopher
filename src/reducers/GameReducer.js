export default function reducer(state = {
      secondsElapsed: 0,
      gameOverTimeLeft: -1,
      userQuit: false,
      gameStart: false,
      gameOver: false,
      gameData: null,
      countPolygonsIdentified: 0,
      maxCountPolygons: null,
      incorrectEntries: [],
      totalAttempts: 0,
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA':
      return {
        ...state,
        secondsElapsed: 30000,
        gameOverTimeLeft: -1,
        userQuit: false,
        gameStart: false,
        gameOver: false,
        gameData: action.payload,
        countPolygonsIdentified: 0,
        maxCountPolygons: action.payload.length,
        incorrectEntries: [],
        totalAttempts: 0,
      };

    case 'START_GAME':
      return {
        ...state,
        gameStart: action.payload.gameStart,
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
