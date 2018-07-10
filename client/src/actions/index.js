import types from './types';
import axios from 'axios';
import dummyData from '../components/dummy_data';

export function incrementCount(count) {
    return {
        type: types.INCREMENT_COUNT,
        payload: ++count
    }
}

export function getStudentList() {
    //async axios call, put async before function keyword
    const path = '/api/get_student_data';
    const response = axios.get(path)
    return {
        type: types.GET_STUDENT_LIST,
        payload: response
    }
}

export function updateInput(name, value) {
    return {
        type: types.UPDATE_INPUT,
        payload: { name, value }
    }
}
export function clearInput(name){
    return{
        type: types.CLEAR_INPUT,
        payload: name
    }
}

export function addStudent(student){
    const path = '/api/add_student';
    const response = axios.post(path, student);
    return{
        type: types.ADD_STUDENT,
        payload: response
    }
}
export function updateStudent(student){

    const path = '/api/edit_student';
    const response = axios.post(path,{
         student
    });
    console.log("this is the response in updateStudent: ", response);
    return{
        type: types.UPDATE_STUDENT,
        payload: response
    }
}

export function deleteStudent(id){
    console.log("Delete function ran in index.js");

    const path = '/api/delete_student';
    const response = axios.delete(path,{
        params: {id}
    });
    console.log("this is the response from the delete student: ", response);

    return{
        type: types.DELETE_STUDENT,
        payload: response
    }
}

export function showModal(student){
    console.log("show modal fired");
    return{
        type: types.SHOW_MODAL,
        payload: {
            isShowing: true,
            student,
            studentName: student.student_name,
            studentGrade: student.grade_value,
            className: student.class_name
        }
    }
}
export function editModalDisplay(student){
    return{
        type: types.SHOW_MODAL,
        payload: {
            isShowingEdit: true,
            student,
            studentName: student.student_name,
            studentGrade: student.grade_value,
            className: student.class_name
        }
    }
}
export function hideModal(){
    console.log("hide modal function fired: ");

    return{
        type: types.HIDE_MODAL,
        payload: {
            isShowing: false,
            isShowingEdit: false
        }
    }
}
