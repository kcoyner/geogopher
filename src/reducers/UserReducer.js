export default function reducer(state = {
  user: null,
  userGameSelected: null,
  registering: null,
}, action) {
  switch (action.type) {
  case 'SET_USER_GAME_SELECTED': {
    return {
      ...state,
      userGameSelected: action.payload.userGameSelected
    };
  }
  case 'USERS_REGISTER_REQUEST': {
    return { 
      ...state,
      registering: true,
     };
  }
  case 'LOGIN_SUCCESS': {
    return {
      ...state,
      user: action.payload
    };
   }
   case 'LOGOUT': {
     return {}
   }
  }
  return state;
}
