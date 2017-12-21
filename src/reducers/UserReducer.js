export default function reducer(state = {
  user: null,
  gameSelected: null,
  registeredUser: null,
  registering: null,
}, action) {
  switch (action.type) {
  case 'SELECT_GAME': {
    return {
      ...state,
      gameSelected: action.payload
    };
  }
  case 'USERS_REGISTER_REQUEST': {
    return {
      ...state,
      registering: true,
     };
  }
  case 'REGISTER_SUCCESS': {
    return {
      ...state,
      user: action.payload
    }
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