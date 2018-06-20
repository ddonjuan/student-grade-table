import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentList, deleteStudent } from '../actions';

class StudentList extends Component {

    constructor(props) {

        super(props);
        this.getServerData();
        this.deleteDataFromServer = this.deleteDataFromServer.bind(this);

    }

    async getServerData() {
        await this.props.getStudentList();
    }

    async deleteDataFromServer(id) {
        await this.props.deleteStudent(id);
    }

    render() {

        const { studentList } = this.props;

        const students = studentList.map((student, index) => {
            return (
                <tr key={index}>
                    <td >{student.student_name}</td>
                    <td>{student.class_name}</td>
                    <td>{student.grade_value}</td>
                    <td><button onClick={() => {
                        this.deleteDataFromServer(student.id);
                        this.getServerData();
                    }} className="btn btn-danger">Delete</button></td>
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

    return ({
        studentList: state.studentListReducer.studentList,
        deleteStudent: state.deleteStudent
    });

}

export default connect(mapStateToProps, { getStudentList, deleteStudent })(StudentList);