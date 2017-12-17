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

export const submitCorrectEntry = (countPolygonsEntered, polygonIndex, gameData) => {

  return (dispatch) => {
    // incrememnt countPolygonsIdentified
    countPolygonsEntered = countPolygonsEntered + 1
    gameData = gameData.map((el, idx) => {
      if (el.id === polygonIndex) {
        el.polygonAnswered = true;
        return el
      } else {
        return el
      }
    });

    dispatch({
      type: 'ANSWER_CORRECT',
      payload: {
        countPolygonsEntered: countPolygonsEntered,
        gameData: gameData,
      }
    });
  }
};

export const submitIncorrectEntry = (answerSubmitted, incorrectEntries) => {
  return (dispatch) => {
    incorrectEntries.push(answerSubmitted)
    dispatch({
      type: 'ANSWER_INCORRECT',
      payload: {
        incorrectEntries: incorrectEntries,
      }
    });
  }
};

//called in map component at end of every key press ==== enter (13)
export const incrementTotalSubmissions = (countTotalSubmissions) => {
  return (dispatch) => {
    countTotalSubmissions = countTotalSubmissions + 1;
    dispatch({
      type: 'INCREMENT_TOTAL_SUBMISSIONS',
      payload: {
        countTotalSubmissions: countTotalSubmissions
      }
    });
  }
};
