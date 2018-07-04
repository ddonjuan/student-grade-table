import React, { Component } from 'react';
import {connect} from 'react-redux';
import {hideModal, deleteStudent, getStudentList} from '../actions';

class deleteWarningModal extends Component {
    constructor(props){
        super(props);

        this.getServerData();
        this.deleteDataFromServer = this.deleteDataFromServer.bind(this);

    }

    async getServerData() {
        await this.props.getStudentList();
    }

    async deleteDataFromServer() {
        const {currentStudent} = this.props;
        await this.props.deleteStudent(currentStudent.id);
    }

    render(){
        const {studentName, studentGrade, className, hideModal} = this.props;

        return (
                <div className={`modal ${this.props.modalClose}`}>
                    <div className="modal-content">
                        <span onClick={()=>{this.props.hideModal()}} className="close-btn">&times;</span>
                        <h2 className="page-header title">Please Confirm Deletion</h2>
                        <h5>Are you sure you want to delete this record?</h5>
                        <div className="student-info">
                            <p>Student Name: <span>{studentName}</span></p>
                            <p>Course Name: <span>{className}</span></p>
                            <p>Student Grade: <span>{studentGrade}</span></p>
                        </div>    
                        <div className="button-holder">
                            <button 
                                onClick={()=>{
                                this.deleteDataFromServer();
                                this.getServerData();
                                hideModal()

                                }} 
                                className="confirm">
                                Confirm
                                </button>

                            <button 
                                onClick={()=>{
                                    hideModal()
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
function mapStateToProps(state){
    return{
        modal: state.modalReducer.isShowing,
        deleteStudent: state.deleteStudent,
        studentList: state.studentListReducer.studentList,
        student: state.modalReducer.student,
        studentName: state.modalReducer.studentName,
        studentGrade: state.modalReducer.studentGrade,
        className: state.modalReducer.className



    }
}
export default connect(mapStateToProps, {hideModal, deleteStudent, getStudentList})(deleteWarningModal);