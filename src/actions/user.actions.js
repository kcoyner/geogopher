import { userService } from '../services';

export const userActions = {
    register,
};

function register(user) {
    // return dispatch => {
    //     dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    console.log('User created: ', user);
                    // dispatch(success());
                    // history.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    console.log('Error registering user: ', error);
                    // dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    // };

    // function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    // function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    // function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}