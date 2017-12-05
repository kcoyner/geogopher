export default function reducer(state = {
    gameData: null,
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA': {
      console.log(action.payload)
      return {
        ...state,
        availableGames: action.payload
      };
    }
  }
  return state;
}
