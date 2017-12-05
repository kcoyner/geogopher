/*
 * src/actions/GamesList.actions.js
 */

import axios from 'axios';
const apiUrl = 'http://testing.geogopher.org/api/gameslist';

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
