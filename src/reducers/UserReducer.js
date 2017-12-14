export default function reducer(state = {
  userName: null,
  gameSelected: null,
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
  case 'LOGIN_SUCCESS': {
    return {
      ...state,
      userName: action.payload
    };
   }
   case 'LOGOUT': {
     return {}
   }
  }
  return state;
}
