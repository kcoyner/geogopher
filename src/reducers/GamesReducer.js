export default function reducer(
  state = {
    availableGames: null
  }, action) {
    switch (action.type) {
      case 'GET_AVAILABLE_GAMES': {
        return {
          ...state,
          availableGames: action.payload.availableGames
        }
      }
    }

    return state;
  }
