import { combineReducers } from 'redux'

import GamesReducer from './GamesReducer'
import UserReducer from './UserReducer'

export default combineReducers({
  GamesReducer,
  UserReducer
})
