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

        userService.register(user)
            .then(
                user => {
                    console.log('User created: ', user);
                    dispatch(success(user));
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log('Error registering user: ', error);
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: 'USERS_REGISTER_REQUEST', user } }
    function success(user) { return { type: 'REGISTER_SUCCESS', payload: user } }
    // function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function login(user, google) {
    return dispatch => {
        if(google) {
            return userService.getGoogleUserInfo(user.profileObj, true)
            .then(
                userObj => {
                    user.profileObj.user_id = userObj;
                    dispatch({ type: 'LOGIN_SUCCESS', payload: user.profileObj })
                },
                error => {
                    console.log('Error getting user info: ', error)
                }
            )
        } else {
            return userService.login(user)
                .then(
                    user => {
                        dispatch({ type: 'LOGIN_SUCCESS', payload: user })
                        return user;
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
