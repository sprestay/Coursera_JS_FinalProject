import { combineReducers } from 'redux';
import { PairsReducer } from './PairsReducer';

export const Reducer = combineReducers({
    pairs: PairsReducer,
})