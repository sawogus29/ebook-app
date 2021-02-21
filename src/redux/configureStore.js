import { combineReducers, createStore } from 'redux';
import userReducer from './ducks.user';

const reducer = combineReducers();

const store = createStore(reducer);

export default store;