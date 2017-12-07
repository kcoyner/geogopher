export default function reducer(state = {
    gameData: null,
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA': {
      return {
        ...state,
        gameData: action.payload
      };
    }
  }
  return state;
}
