import { userConstants } from '../../shared/constants';
import { userService } from '../../store/services';
import { alertActions } from './';
import { history } from '../../shared/helpers';

export const userActions = {
    login,
    logout,
    register
};

function login(username, password, from) {
    return dispatch => {
        dispatch(request({ username }));
        
        userService.login(username, password)
            .then(
                response => { 
                    if(response.success) {
                        let user = response.user;
                        dispatch(success(user));
                        history.push(from);
                    } else {
                        let error = response.message;
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                response => { 
                    if(response.success) {
                        let user = response.user;
                        dispatch(success(user));
                        history.push('/');
                        dispatch(alertActions.success(response.message));
                    } else {
                        let error = response.message;
                        dispatch(failure(error.toString()));
                        dispatch(alertActions.error(error.toString()));                        
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

 