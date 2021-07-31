import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { packageReducer, queueReducer } from './reducers';

const COMPOSE = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({ package: packageReducer, queue: queueReducer });

export const store = createStore(reducers, COMPOSE(applyMiddleware()));
