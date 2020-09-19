import { createStore } from 'redux';
import { Reducer } from './Reducer';

export const ConfigureStore = () => {

    const store = createStore(Reducer);
    return store;
}