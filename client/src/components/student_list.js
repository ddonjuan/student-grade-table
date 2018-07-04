import React, { Component } from 'react';
import WarningModal from './delete_warning_modal';
import { connect } from 'react-redux';
import { getStudentList, showModal, hideModal } from '../actions';

class StudentList extends Component {

    constructor(props) {
        super(props);

        this.state={
            modalInfo: false,
        }
        this.getServerData();

    }

    async getServerData() {
        await this.props.getStudentList();
    }


    render() {
        const { studentList, modal, student} = this.props;
        const {modalInfo} = this.state;
        const modalOpen = modal ? 'show' : '';
        const students = studentList.map((student, index) => {
            const {student_name, class_name, grade_value} = student;
            return (
                <tr key={index}>
                    <td >{student.student_name}</td>
                    <td>{student.class_name}</td>
                    <td>{student.grade_value}</td>
                    {/* <td>Edit button</td> */}
                    <td>
                        <div>
                            <button onClick={() => {
                                this.props.showModal(student);
                                this.setState({
                                    modalInfo: true
                                });
                            }}
                                className="btn btn-danger">Delete</button>

                                <WarningModal 
                                currentStudent={this.props.student}
                                modalFlag={modalInfo}
                                studentName={student_name}
                                studentGrade={grade_value}
                                courseName={class_name}
                                // studentID={student.id} 
                                // studentName={student.student_name} 
                                // courseName={student.class_name} 
                                modalClose={modalOpen}/>

                        </div>

                    </td>
                </tr>
            )
        });

        return (
            <div className="studentList">

                <div className="student-list-container col-xs-12 col-xs-9">
                    <table className="student-list page-header media-heading table">
                        <thead>
                            <tr>
                                <th className="col-md-3 col-xs-3">Student Name</th>
                                <th className="col-md-3 col-xs-3">Student Course</th>
                                <th className="col-md-3 col-xs-3">Student Grade</th>
                                {/* <th className="col-md-3 col-md-offset-1 col-xs-3 col-xs-offset1">Edit Student</th> */}
                                <th className="col-md-3 col-xs-3">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    console.log("This is the state in student list:",state)
    return ({
        studentList: state.studentListReducer.studentList,
        modal: state.modalReducer.isShowing,
        student: state.modalReducer.student
    });

}

export default connect(mapStateToProps, { getStudentList, showModal, hideModal })(StudentList);