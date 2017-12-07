import axios from 'axios';
import { buildGameData } from '../utils/gameDataInit';

export const initializeNewGame = (apiUrl) => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        return buildGameData(response.data)
      })
      .then(response => {
        dispatch({ type: 'NEWGAME_DATA', payload: response })
        return response;
      })
      .catch(error => {
        throw (error);
      });
  };
};
