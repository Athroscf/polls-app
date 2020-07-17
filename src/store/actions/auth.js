import axios from 'axios';

import * as actionTypes from './actionTypes';
import Swal from '../../components/UI/SweetAlert/Message/Message';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = ( expirationTime ) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = ( email, password, isSignIn, click ) => {
    return dispatch => {
        dispatch( authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAw2nGmwB3w41m2nXNJkbh5UbHUco6PKVo'
        let show = false;
        let message = null;

        if ( !isSignIn ) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAw2nGmwB3w41m2nXNJkbh5UbHUco6PKVo'
            show = true;
            message = 'Tu cuenta ha sido creada!'
        }

        axios.post(url, authData)
             .then(response => {
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
                Swal({
                    show: show,
                    text: message,
                    icon: "success",
                    confirmButtonText: "Ok"
                })
             })
             .catch(err => {
                dispatch(authFail(err.response.data.error));
             })
    };
};