import * as actionTypes from './actionTypes';
import axios from '../../axios-polls';

export const initPolls = () => {
    return dispatch => {
        dispatch(fetchPollsStart())
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
                dispatch(setResults(fetchedPolls));
            })
            .catch( error => {
                dispatch(fetchPollsFailed( error ))
            })
    }
}

export const fetchPollsStart = () => {
    return {
        type: actionTypes.FETCH_POLLS_START
    }
}

export const setPolls = ( polls ) => {
    return {
        type: actionTypes.FETCH_POLLS_SUCCESS,
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

export const addAnswer = ( id, answerData ) => {
    return dispatch => {
        dispatch( addAnswerStart() );
        axios.post( '/polls/'+ id +'/answers.json', answerData )
            .then( response => {
                dispatch( addAnswerSuccess( response.data.name, answerData ) );
            } )
            .catch( error => {
                dispatch( addAnswerFailed( error ) );
            } );
    }
}

export const setResults = ( polls ) => {
    return {
        type: actionTypes.SET_RESULTS,
        results: polls
    }
}

export const fetchPollsFailed = ( error ) => {
    return {
        type: actionTypes.FETCH_POLLS_FAILED
    }
}