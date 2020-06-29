import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    polls: null,
    answered: false,
    loading: false,
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

const addAnswerInit = ( state, action ) => {
    return updateObject( state, { answered: false });
}

const addAnswerStart = ( state, action ) => {
    return updateObject( state, { loading: false } );
}

const addAnswerSuccess = ( state, action ) => {
    const newAnswer = updateObject( action.answerData, { id: action.pollId } );
    return updateObject( state, {
        loading: false,
        answered: true,
        polls: state.answers.concat( newAnswer )
    });
}

const addAnswerFailed = ( state, action ) => {
    return updateObject( state, { loading: false } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type) {
        case actionTypes.SET_POLLS: return setPolls( state, action );
        case actionTypes.FETCH_POLLS_FAILED: return fetchPollsFailed( state, action );
        case actionTypes.ADD_ANSWER_INIT: return addAnswerInit( state, action );
        case actionTypes.ADD_ANSWER_START: return addAnswerStart( state, action );
        case actionTypes.ADD_ANSWER_SUCCESS: return addAnswerSuccess( state, action );
        case actionTypes.ADD_ANSWER_FAILED: return addAnswerFailed( state, action );
        default: return state;
    }
}

export default reducer;