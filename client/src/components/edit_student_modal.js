import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getStudentList, showModal, hideModal, updateInput, clearInput, updateStudent } from '../actions';

class EditModal extends Component{
    constructor(props){
        super(props);
        this.state={
            studentName: '',
            studentGrade: '',
            courseName: ''
        }

        this.getDataFromServer();
        this.clearInputData = this.clearInputData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    async getDataFromServer() {
        await this.props.getStudentList();
    }

    async editStudent(){
        const {student} = this.props;
        console.log("PDPDPDPDKEKEKEKJDDHFJFJF: ", student);
        await this.props.updateStudent(student);
    }

    handleSubmit(event){
        event.preventDefault();
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        this.props.updateInput(name, value);

    }

    clearInputData(){
        for(let key in this.props.form){
            this.props.clearInput(key);
        }
    }
    render(){
        console.log("this is the response in update student: ", updateStudent);
        const { studentList, modal, student, modalOpen, studentName} = this.props;
        const { student_name, class_name, grade_value } = this.props.form;
        console.log("student name: ", student_name);
        console.log("student in props without form: ", studentName);
        console.log("THis is the STUDENT IN the EDIT MODAL: ", student);


        return(
            <div className={`modal ${modalOpen}`}>
            <div className="modal-content">
                <span onClick={()=>{this.props.hideModal()}} className="close-btn">&times;</span>
                <h2 className="page-header title">Edit Student</h2>
                <h5>Student Record</h5>
                <div className="student-info">
                <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                        <input value={student_name} onChange={this.handleInputChange} type="text" className="form-control" name="student_name" id="studentName" placeholder="Student Name" />
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-list-alt"></span>
                        </span>
                        <input value={class_name} onChange={this.handleInputChange} type="text" className="form-control" name="class_name" id="course"
                            placeholder="Student Course" />
                    </div>
                    <div className="input-group form-group">
                        <span className="input-group-addon">
                            <span className="glyphicon glyphicon-education"></span>
                        </span>
                        <input value={grade_value} onChange={this.handleInputChange} type="number" className="form-control" name="grade_value" id="studentGrade"
                            placeholder="Student Grade" />
                    </div>
                </div>    
                <div className="button-holder">
                    <button 
                        onClick={()=>{
                            console.log("edit modal modal opened: ", this.props)
                        this.editStudent();
                        this.getDataFromServer();
                        this.props.hideModal()

                        }} 
                        className="confirm">
                        Update
                        </button>

                    <button 
                        onClick={()=>{
                            this.props.hideModal()
                            }}
                        className="cancel">
                        Cancel
                        </button>
                </div>
            </div>
        </div>        
        )
    }
}
function mapStateToProps(state) {
    const { student_name, class_name, grade_value } = state.inputReducer;

    return ({
        studentList: state.studentListReducer.studentList,
        modal: state.modalReducer.isShowing,
        student: state.modalReducer.student,
        isShowingEdit: state.modalReducer.isShowingEdit,
        updateStudent: state.studentListReducer.updateStudent,
        studentName: state.modalReducer.studentName,
        form: {
            class_name,
            student_name,
            grade_value
        }
    });

}
export default connect(mapStateToProps, {getStudentList, showModal, hideModal, updateInput, clearInput, updateStudent})(EditModal);