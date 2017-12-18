export default function reducer(state = {
      gameData: null,
      maxCountPolygons: null,
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
    case 'RESET_GAME':
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


  //end switch
  }
  return state;
  //end function body
}
