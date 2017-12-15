export const setScoreIDs = (gameSelected) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_GAME_ID',
      payload: {
        gameID: gameSelected.game_id,
      }
    })
  }
}
