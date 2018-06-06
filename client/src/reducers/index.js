import { combineReducers } from 'redux';
import countReducer from './count_reducer';

export default combineReducers({ countReducer: countReducer });