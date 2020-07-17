import axios from 'axios';

import * as actionTypes from './actionTypes';
import Swal from '../../components/UI/SweetAlert/Message/Message';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = ( token, userId, email ) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        email: email
    };
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
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

export const auth = ( email, password, isSignIn ) => {
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
                console.log('[USER_ID]', response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('email', response.data.email);
                dispatch(authSuccess(response.data.idToken, response.data.localId, response.data.email));
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

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');

        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            console.log('[EXP_DATE]', expirationDate <= new Date());
            if (expirationDate <= new Date()) {
                console.log('[Entro al segundo IF]');
                dispatch(logout());
            } else {
                console.log('[Entro al segundo ELSE]');
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};