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

export const setGameTypeID = (gameTypeID) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_GAME_TYPE_ID',
      payload: {
        gameTypeID: gameTypeID,
      }
    })
  }
}

export const setGameDifficultyID = (gameDifficultyID) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_GAME_DIFFICULTY_ID',
      payload: {
        gameDifficultyID: gameDifficultyID,
      }
    })
  }
}

export const setTimer = (time) => {
    return (dispatch) => {
      dispatch({
        type: 'SET_TIMER',
        payload: {
          gameTimerStart: time,
          gameTimerRemaining: time,
        }
      })
    }
}
