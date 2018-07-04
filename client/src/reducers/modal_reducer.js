import types from '../actions/types';

const DEFAULT_STATE = {
    isShowing: false
};

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case types.SHOW_MODAL:
            return{
                ...state,
                isShowing: action.payload.isShowing,
                student: action.payload.student,
                studentName: action.payload.studentName,
                studentGrade: action.payload.studentGrade,
                className: action.payload.className
            }
        case types.HIDE_MODAL:
            return{
                ...state,
                isShowing: action.payload.isShowing
            }  
        default:
            return state;      
    }
}
