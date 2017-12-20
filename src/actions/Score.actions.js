import axios from 'axios';

export const resetScore = () => {
  return (dispatch) => {
    dispatch({
      type: 'RESET_SCORE'
    })
  }
}

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

export const setGameStartTimestamp = () => {
  let currentTime = Date.now()
    return (dispatch) => {
      dispatch({
        type: "SET_GAME_START_TIMESTAMP",
        payload: {
          gameStartTimestamp: currentTime,
        }
      })
    }
}

export const setGameEndTimestamp = () => {
  let currentTime = Date.now()
    return (dispatch) => {
      dispatch({
        type: "SET_GAME_END_TIMESTAMP",
        payload: {
          gameEndTimestamp: currentTime,
        }
      })
    }
}

export const setPolygonsAnsweredUnanswered = (polygons) => {
    return (dispatch) => {
      dispatch({
        type: "SET_POLYGONS_ANSWERED_UNANSWERED",
        payload: {
          polygonsAnswered: polygons.answered,
          polygonsUnanswered: polygons.unanswered,
        }
      })
    }
}

export const submitCorrectEntry = (countPolygonsEntered, polygonIndex, gameData) => {

  return (dispatch) => {
    // incrememnt countPolygonsIdentified
    countPolygonsEntered = countPolygonsEntered + 1
    //something interesting here about gameData. this variable is technically not a 'score' related action or
    //related to the score table. but because the entry submission process changes both gameData and scores, variables from
    //two reducers exist in these submit___Entry actions. Because all of the reducers are combined via combineReducers,
    //gameData is successfully stored in the GameReducer from this Scores.Actions file.
    // ------TLDR ------
    // gameData techincally belongs in the Games.actions file
    gameData = gameData.map((el, idx) => {
      if (el.id === polygonIndex) {
        el.polygonAnswered = true;
        return el
      } else {
        return el
      }
    });

    dispatch({
      type: 'ENTRY_CORRECT',
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
      type: 'ENTRY_INCORRECT',
      payload: {
        incorrectEntries: incorrectEntries,
      }
    });
  }
};

export const submitSkippedEntry = (polygonIndex, gameData) => {
  return (dispatch) => {

    gameData = gameData.map((el, idx) => {
      if (el.id === polygonIndex) {
        el.polygonAnswered = true;
        return el
      } else {
        return el
      }
    });

    dispatch({
      type: 'ENTRY_SKIPPED',
      payload: {
        gameData: gameData,
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


export const postScore = (score) => {
return (dispatch) => {
  axios.post('/api/postScore', score)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
      throw (error);
    });
  }
};
