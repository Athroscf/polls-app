import * as actionTypes from './actionTypes';
import axios from '../../axios-polls';

export const initPolls = () => {
    return dispatch => {
        axios.get('/polls.json')
            .then( response => {
                const fetchedPolls = [];
                for ( let key in response.data ) {
                    fetchedPolls.push( {
                        ...response.data[key],
                        id: key
                    })
                }
                dispatch(setPolls(fetchedPolls));
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

export const addAnswerSuccess = ( id, orderData ) => {
    return {
        type: actionTypes.ADD_ANSWER_SUCCESS,
        answerId: id,
        answerData: orderData
    }
}

export const addAnswerFailed = ( error ) => {
    return {
        type: actionTypes.ADD_ANSWER_FAILED,
        error: error
    }
}

export const addAnswerStart = () => {
    return {
        type: actionTypes.ADD_ANSWER_START
    }
}

export const addAnswer = ( answerData ) => {
    return dispatch => {
        dispatch( addAnswerStart() );
        axios.post( '/answer.json', answerData )
            .then( response => {
                console.log( response.data );
                dispatch( addAnswerSuccess( response.data.name, answerData ) );
            } )
            .catch( error => {
                dispatch( addAnswerFailed( error ) );
            } );
    }
}

export const fetchResults = ( id ) => {
    return {
        type: actionTypes.FETCH_RESULTS_START,
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