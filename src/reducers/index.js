import { combineReducers } from 'redux';

import GamesListReducer from './GamesListReducer';
import UserReducer from './UserReducer';
import GameReducer from './GameReducer';

export default combineReducers({
  GamesListReducer,
  UserReducer,
  GameReducer,
});
