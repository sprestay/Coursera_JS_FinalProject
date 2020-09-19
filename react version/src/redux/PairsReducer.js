import * as ActionTypes from "./ActionTypes";

const initialState = {
    pairs: [],
    previous: [],
    errors: [],
};

export const PairsReducer = function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.NEW_ITEM:
            return {...state, previous: state.previous.concat(action.payload), }
        case ActionTypes.ADD_TO_PAIRS:
            return {...state, pairs: state.pairs.concat(action.payload)}
        case ActionTypes.ERROR_MATCH:
            return {...state, errors: state.errors.concat(action.payload)}
        case ActionTypes.CLEAR_PREVIOUS:
            return {...state, previous: []}
        case ActionTypes.CLEAR_ERRORS:
            return {...state, errors: []}
        case ActionTypes.CLEAR_PAIRS:
            return {...state, pairs: []}
        default:
            return state;
    }
}