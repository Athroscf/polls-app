import * as actionTypes from './actionTypes';
import axios from '../../axios-polls';

export const initPolls = () => {
    return dispatch => {
        axios.get('/listPolls')
            .then( response => {
                dispatch(setPolls(response.data.result))
            })
            .catch( error => {
                dispatch(fetchPollsFailed())
            })
    }
}

export const setPolls = ( polls ) => {
    return {
        type: actionTypes.SET_POLLS,
        polls: polls
    }
}

export const addAnswer = ( id ) => {
    return {
        type: actionTypes.ADD_ANSWER,
        pollId: id
    }
}

export const fetchResults = ( id ) => {
    return {
        type: actionTypes.FETCH_RESULTS,
        pollId: id
    }
}

export const fetchPollsFailed = () => {
    return {
        type: actionTypes.FETCH_POLLS_FAILED
    }
}

export const fetchResultsFailed = ( id ) => {
    return {
        type: actionTypes.FETCH_RESULTS_FAILED
    }
}