import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: false
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type) {
        case actionTypes.FETCH_POLL_TITLES:
            return {
                ...state,

            }
        case actionTypes.FETCH_POLL:
            return {
                ...state,

            }
        case actionTypes.FETCH_RESULTS:
            return {
                ...state,

            }
        case actionTypes.ADD_ANSWER:
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default reducer;