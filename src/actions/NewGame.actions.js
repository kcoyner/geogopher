import axios from 'axios';

export const initializeNewGame = (apiUrl) => {
  return (dispatch) => {
    axios.get(apiUrl)
      .then(response => {
        dispatch({ type: 'NEWGAME_DATA', payload: response.data });
        return response;
      })
      .catch(error => {
        throw (error);
      });
  };
};
