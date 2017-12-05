/*
 * src/actions/GamesList.actions.js
 */

import axios from 'axios';
const apiUrl = '/api/gameslist';

export const fetchGamesList = () => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        console.log(apiUrl);
        dispatch({ type: 'FETCH_GAMESLIST', payload: response.data });
        return response;
      })
      .catch(error => {
        console.log('GEOGOPHER error: ', error);
        throw (error);
      });
  };
};
