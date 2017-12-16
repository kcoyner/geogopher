import { combineReducers } from 'redux';

import GamesListReducer from './GamesListReducer';
import UserReducer from './UserReducer';
import GameReducer from './GameReducer';
import ScoreReducer from './ScoreReducer';

export default combineReducers({
  GamesListReducer,
  UserReducer,
  GameReducer,
  ScoreReducer,
});
