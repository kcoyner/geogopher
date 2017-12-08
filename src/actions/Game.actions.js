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

export const submitCorrectAnswer = (countPolygonsIdentified, polygonIndex, gameData) => {
  return (dispatch) => {
  countPolygonsIdentified = countPolygonsIdentified + 1
  gameData = gameData.map((el, idx) => {
    if (idx === polygonIndex) {
      el.polygonAnswered = true;
      return el
    } else {
      return el
    }
  });

  dispatch({ type: 'ANSWER_CORRECT',
             payload: {
               countPolygonsIdentified: countPolygonsIdentified,
               gameData: gameData,
              }
           })
  }

};

export const submitMistake = (answerInputted, entriesMissed) => {
  return (dispatch) => {
  entriesMissed.push(answerInputted)
  dispatch({ type: 'ANSWER_INCORRECT',
             payload: {
               entriesMissed: entriesMissed,
              }
           })
  }

};
