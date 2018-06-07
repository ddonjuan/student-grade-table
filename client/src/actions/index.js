import types from './types';
import axios from 'axios';
import dummyData from '../components/dummy_data';


export function incrementCount(count){
    return{
        type: types.INCREMENT_COUNT,
        payload: ++count
    }
}
export function getStudentList(){
    //async axios call, put async before function keyword

    const response = await axios.get('/api/get_student_data', dataToSend).then({
        console.log("listening in ");
    })
    return{
        type: types.GET_STUDENT_LIST,
        payload: dummyData
    }
}