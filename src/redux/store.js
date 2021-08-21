import { createStore, applyMiddleware, compose } from 'redux';
import { packageReducer } from './reducers';

const COMPOSE = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(packageReducer, COMPOSE(applyMiddleware()));
