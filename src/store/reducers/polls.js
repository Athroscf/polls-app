import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    polls: null,
    error: false
};

const setPolls = ( state, action ) => {
    return updateObject( state, {
        polls: action.polls,
        error: false
    })
}

const fetchPollsFailed = ( state, action ) => {
    return updateObject( state, { error: true } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type) {
        case actionTypes.SET_POLLS: return setPolls( state, action );
        case actionTypes.FETCH_POLLS_FAILED: return fetchPollsFailed( state, action );
        default: return state;
    }
}

export default reducer;

// case actionTypes.FETCH_POLLS:
//             return {
//                 ...state,
//                 error: false
//             }
//         case actionTypes.FETCH_RESULTS:
//             return {
//                 ...state,
//                 error: false
//             }
//         case actionTypes.ADD_ANSWER:
//             return {
//                 ...state,
//                 error: false
//             }
//         case actionTypes.ADD_ANSWER_FAILED:
//             return {
//                 ...state,
//                 error: true
//             }
//         case actionTypes.FETCH_POLLS_FAILED:
//             return {
//                 ...state,
//                 error: true
//             }
//         case actionTypes.FETCH_RESULTS_FAILED:
//             return {
//                 ...state,
//                 error: true
//             }