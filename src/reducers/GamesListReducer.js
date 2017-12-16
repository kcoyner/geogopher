export default function reducer(state = {
    availableGames: [],
    gameTypes: null,
    gameDifficulties: null,
  },
  action) {
  switch (action.type) {
    case 'FETCH_GAMESLIST': {
      return {
        ...state,
        availableGames: action.payload
      };
    }

    case 'FETCH_GAME_TYPES_AND_DIFFICULTIES': {
      return {
        ...state,
        gameTypes: action.payload.game_types,
        gameDifficulties: action.payload.game_difficulties

      };
    }

  }
  return state;
}
