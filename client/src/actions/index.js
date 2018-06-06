import types from './types';
import dummyData from '../components/dummy_data';


export function incrementCount(count){
    return{
        type: types.INCREMENT_COUNT,
        payload: ++count
    }
}
export function getStudentList(){
    //async axios call, put async before function keyword
    // const response = await axios.get('url', dataToSend)
    return{
        type: types.GET_STUDENT_LIST,
        payload: dummyData
    }
}