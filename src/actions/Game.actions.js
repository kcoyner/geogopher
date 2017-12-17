import axios from 'axios';
import { buildGameData } from '../utils/gameDataInit';
//called in map componentDidMount
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
//called in gameList when user selects game
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
//called in game settings when user selects game difficulty
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

//called in game settings when user selects game type
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





export const decrementTime = (gameTimerRemaining) => {
  return (dispatch) => {
    gameTimerRemaining = gameTimerRemaining - 1;
    dispatch({
      type: 'DECREMENT_TIME',
      payload: {
        gameTimerRemaining: gameTimerRemaining
      }
    });
  }
};
