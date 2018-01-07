import { userService } from '../services';
import axios from 'axios';

export const userActions = {
    register,
    login,
    logout
};

function register(user) {
    return dispatch => {
        dispatch(request(user));
        return userService.register(user)
            .then(
                user => {
                    if(user){
                        console.log('User created: ', user);
                        dispatch(success(user));
                    } else {
                        return "A user with that email already exists."
                    }
                },
                error => {
                    console.log('Error registering user: ', error);
                }
            );
    };

    function request(user) { return { type: 'USERS_REGISTER_REQUEST', user } }
    function success(user) { return { type: 'REGISTER_SUCCESS', payload: user } }
    // function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(user, google) {
    return dispatch => {
        // If the user is logging in through google...
        if(google) {
            return userService.getGoogleUserInfo(user.profileObj, true)
            .then(
                userObj => {
                    dispatch({ type: 'LOGIN_SUCCESS', payload: userObj })
                },
                error => {
                    console.log('Error getting user info: ', error)
                }
            )
        } else {
            return userService.login(user)
                .then(
                    user => {
                        if(user) {
                            dispatch({ type: 'LOGIN_SUCCESS', payload: user })
                            return user;
                        } else {
                            return;
                        }
                    },
                    error => {
                        return error;
                    }
                )
        }
    }
}

function logout() {
    return dispatch => { 
        return userService.logout()
            .then( () => {
                dispatch({ type: 'LOGOUT' });
                dispatch({ type: 'CLEAR_GAME'});
                return;
            })
    };
}
