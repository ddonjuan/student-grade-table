import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudentList } from '../actions';

class StudentList extends Component {
    render() {
        console.log('this.props.getStudentList function: ',this.props.getStudentList());
        
        this.props
        debugger;
        return (
            <div classNameName="studentList">
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