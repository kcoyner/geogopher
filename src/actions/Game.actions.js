import axios from 'axios';
import { buildGameData } from '../utils/gameDataInit';

export const initializeNewGame = (apiUrl) => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        return buildGameData(response.data)
      })
      .then(response => {
        dispatch({ type: 'GAME_DATA_BUILT', payload: response })
        return response;
      })
      .catch(error => {
        throw (error);
      });
  };
};

export const selectGame = (gameSelected) => {
  return (dispatch) => {
    dispatch({
      type: 'GAME_SELECTED',
      payload: {
        gameSelected: gameSelected.game_name,
        gameJSON: gameSelected.game_json,
        gameCenterCoords: JSON.parse(gameSelected.game_center_coords),
        gameZoom: gameSelected.game_zoom,
        maxCountPolygons: gameSelected.max_count_polygons,
      }
    })
  }
}
export const setGameDifficulty = (gameDifficultySelected) => {
  return (dispatch) => {
    dispatch({
      type: 'GAME_DIFFICULTY_SELECTED',
      payload: {
        gameDifficultySelected: gameDifficultySelected,
      }
    })
  }
}
export const setGameType = (gameTypeSelected) => {
  return (dispatch) => {
    dispatch({
      type: 'GAME_TYPE_SELECTED',
      payload: {
        gameTypeSelected: gameTypeSelected,
      }
    })
  }
}

export const submitCorrectEntry = (countPolygonsIdentified, polygonIndex, gameData) => {
  console.log('polygonsIdentified', countPolygonsIdentified);
  console.log('polygonIndex', polygonIndex);
  console.log('gameData', gameData);
  return (dispatch) => {
    // incrememnt countPolygonsIdentified
    countPolygonsIdentified = countPolygonsIdentified + 1
    gameData = gameData.map((el, idx) => {
      if (el.id === polygonIndex) {
        console.log('el.id', el.id)
        console.log('polygonIndex', polygonIndex)
        el.polygonAnswered = true;
        return el
      } else {
        return el
      }
    });

    dispatch({
      type: 'ANSWER_CORRECT',
      payload: {
        countPolygonsIdentified: countPolygonsIdentified,
        gameData: gameData,
      }
    });
  }
};

export const submitIncorrectEntry = (answerInputted, incorrectEntries) => {
  return (dispatch) => {
    incorrectEntries.push(answerInputted)
    dispatch({
      type: 'ANSWER_INCORRECT',
      payload: {
        incorrectEntries: incorrectEntries,
      }
    });
  }
};

export const decrementTime = (secondsElapsed) => {
  return (dispatch) => {
    secondsElapsed = secondsElapsed - 1;
    dispatch({
      type: 'DECREMENT_TIME',
      payload: {
        secondsElapsed: secondsElapsed
      }
    });
  }
};

export const incrementTotalAttempts = (totalAttempts) => {
  return (dispatch) => {
    totalAttempts = totalAttempts + 1;
    dispatch({
      type: 'INCREMENT_TOTAL_ATTEMPTS',
      payload: {
        totalAttempts: totalAttempts
      }
    });
  }
};
