import { combineReducers } from 'redux';

import GamesListReducer from './GamesListReducer';
import UserReducer from './UserReducer';
import NewGameReducer from './NewGameReducer';

export default combineReducers({
  GamesListReducer,
  UserReducer,
  NewGameReducer,
});
