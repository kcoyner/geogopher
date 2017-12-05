export default function reducer(state = {
    gameData: null,
  },
  action) {
  switch (action.type) {
    case 'NEWGAME_DATA': {
      let inputGameData = action.payload.features;
      let outputGameData = [];

      inputGameData.forEach(
        (el) => outputGameData.push(el.properties)
      );

      return {
        ...state,
        gameData: outputGameData
      };
    }
  }
  return state;
}
