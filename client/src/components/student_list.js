import React, { Component } from 'react';
import StudentRow from './student_row';
import { connect } from 'react-redux';
import { getStudentList } from '../actions';

class StudentList extends Component {
    constructor(props) {
        super(props);

        this.getServerData = this.getServerData.bind(this);
    }

    componentDidMount() {
        this.getServerData();
    }

    async getServerData() {
        await this.props.getStudentList();
    }

    render() {
        const { studentList } = this.props;
        const students = studentList.map((student, index) => {
            return <StudentRow key={index} student={student} />
        });

        return (
            <div className="studentList">
                <div className="student-list-container col-xs-12 col-xs-9 row">
                    <table className="student-list page-header media-heading table">
                        <thead>
                            <tr>
                                <th className="col-md-3 col-xs-3">Student Name</th>
                                <th className="col-md-3 col-xs-3">Student Course</th>
                                <th className="col-md-3 col-xs-3">Student Grade</th>
                                <th className="col-md-3 col-md-offset-1 col-xs-3 col-xs-offset1">Edit Student</th>
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
        studentList: state.studentListReducer.studentList
    });
}

export default connect(mapStateToProps, { getStudentList })(StudentList);
