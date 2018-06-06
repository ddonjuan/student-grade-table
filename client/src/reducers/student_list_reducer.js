import types from '../actions/types';



const DEFAULT_STATE = {
    studentList: []
};

export default (state = DEFAULT_STATE, action)=>{
    switch(action.type){
        case types.GET_STUDENT_LIST:
            return ({
                ...state, 
                studentList: action.payload
            });
        default:
            return state;
    }
};

