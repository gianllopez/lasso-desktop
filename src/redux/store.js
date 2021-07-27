import { createStore } from 'redux';
import { packageReducer } from './reducers';

export const store = createStore(packageReducer);