export default function reducer(state = {
    startTime: 0,
    endTime: 0,
    gameData: null,
    countPolygonsIdentified: 0,
    maxCountPolygons: 0,
    entriesMissed: [],
    totalAttempts: 0,
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA':
      return {
        ...state,
        startTime: 30000,
        endTime: 0,
        gameData: action.payload,
        countPolygonsIdentified: 0,
        maxCountPolygons: action.payload.length,
        entriesMissed: [],
        totalAttempts: 0,
      };


    case 'ANSWER_CORRECT':
      return {
        ...state,
        gameData: action.payload.gameData,
        countPolygonsIdentified: action.payload.countPolygonsIdentified,
      };

  //end switch
  }
  return state;
  //end function body
}
