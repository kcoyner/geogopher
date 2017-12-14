export default function reducer(state = {
  user: null,
  gameName: null,
  registering: null,
}, action) {
  switch (action.type) {
  case 'SELECT_GAME': {
    return {
      ...state,
      gameName: action.payload
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
