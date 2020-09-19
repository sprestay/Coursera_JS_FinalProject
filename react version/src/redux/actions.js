import * as ActionTypes from './ActionTypes';

export const addItem = (item) => ({
    type: ActionTypes.NEW_ITEM,
    payload: item,
})


export const addPair = (pair) => ({
    type: ActionTypes.ADD_TO_PAIRS,
    payload: pair,
})

export const addError = (id) => ({
    type: ActionTypes.ERROR_MATCH,
    payload: id,
})

export const clearPrevious = () => ({
    type: ActionTypes.CLEAR_PREVIOUS,
})


export const clearErrors = () => ({
    type: ActionTypes.CLEAR_ERRORS,
});

export const clearPairs = () => ({
    type: ActionTypes.CLEAR_PAIRS,
});