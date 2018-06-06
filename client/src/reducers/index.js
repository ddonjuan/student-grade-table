import { combineReducers } from 'redux';
import countReducer from './count_reducer';
import studentListReducer from './student_list_reducer';


export default combineReducers({ 
    countReducer: countReducer,
    studentListReducer: studentListReducer 
});