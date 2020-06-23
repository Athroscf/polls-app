import * as actionTypes from './actionTypes';

export const fetchPollTitles = () => {
    return {
        type: actionTypes.FETCH_POLL_TITLES
    }
}

export const fetchPoll = ( id ) => {
    return {
        type: actionTypes.FETCH_POLL,
        pollId: id
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