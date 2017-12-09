export default function reducer(state = {
    availableGames: []
  },
  action) {
  switch (action.type) {
    case 'FETCH_GAMESLIST': {
      return {
        ...state,
        availableGames: action.payload
      };
    }
  }
  return state;
}
