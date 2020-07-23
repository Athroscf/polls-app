import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            email: null,
            error: null,
            loading: null
        });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            email: null,
            error: null,
            loading: null
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id',
            email: 'some-email'
        })).toEqual({
            token: 'some-token',
            userId: 'some-user-id',
            email: 'some-email',
            error: null,
            loading: null
        });
    });
});