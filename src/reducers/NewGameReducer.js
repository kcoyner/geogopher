export default function reducer(state = {
    startTime: 0,
    endTime: 0,
    gameData: null,
    countPolygonsIdentified: 0,
    maxCountPolygons: 0,
    entriesMissed: [],
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA': {
      return {
        ...state,
        startTime: 30000,
        endTime: 0,
        gameData: action.payload,
        countPolygonsIdentified: 0,
        maxCountPolygons: action.payload.length,
        entriesMissed: [],
      };
    }
  }
  return state;
}
