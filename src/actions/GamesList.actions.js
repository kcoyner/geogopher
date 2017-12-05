/*
 * src/actions/GamesList.actions.js
 */

import axios from 'axios';
const apiUrl = '/api/gameslist';

export const fetchGamesList = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        dispatch({ type: 'FETCH_GAMESLIST', payload: response.data });
        return response;
      })
      .catch(error => {
        throw (error);
      });
  };
};
