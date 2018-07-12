import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteStudent, getStudentList } from '../actions';

class deleteWarningModal extends Component {
    constructor(props){
        super(props);

        this.deleteDataFromServer = this.deleteDataFromServer.bind(this);
    }

    async getServerData() {
        await this.props.getStudentList();
    }

    async deleteDataFromServer() {
        const { id } = this.props.currentStudent;
        await this.props.deleteStudent(id);
        this.getServerData();
        this.props.toggleDeleteModal();
    }

    render(){
        const { student_name, class_name, grade_value } = this.props.currentStudent;

        return (
            <div className="modal show">
                <div className="modal-content">
                    <span onClick={this.props.toggleDeleteModal} className="close-btn">&times;</span>
                    <h2 className="page-header title">Please Confirm Deletion</h2>
                    <h5>Are you sure you want to delete this record?</h5>
                    <div className="student-info">
                        <p>Student Name: <span>{student_name}</span></p>
                        <p>Course Name: <span>{class_name}</span></p>
                        <p>Student Grade: <span>{grade_value}</span></p>
                    </div>    
                    <div className="button-holder">
                        <button 
                            onClick={this.deleteDataFromServer} 
                            className="confirm">
                            Confirm
                            </button>

                        <button 
                            onClick={this.props.toggleDeleteModal}
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
        student: state.modalReducer.student,
    }
}

export default connect(mapStateToProps, {deleteStudent, getStudentList})(deleteWarningModal);
