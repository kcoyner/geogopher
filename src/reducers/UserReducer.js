export default function reducer(state = {
  userName: null,
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
  case 'SET_USER_NAME': {
    return {
      ...state,
      userName: action.payload.userName
    };
   }
  }
  return state;
}
