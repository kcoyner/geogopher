import { combineReducers } from 'redux';

import GamesListReducer from './GamesListReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  GamesListReducer,
  UserReducer
});
