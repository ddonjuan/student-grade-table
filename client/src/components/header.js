import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getStudentList} from '../actions';

class Header extends Component {
    constructor(props){
        super(props);

        this.studentData();

    }
    async studentData(){
        await this.props.getStudentList()
    }
    studentAverage(studentGrades){
            var result = 0;
            for(var i = 0; i < studentGrades.length; i++){
                result += studentGrades[i].grade_value;
            }
            result = result / studentGrades.length;
            result = result.toFixed(2) + "%";
            return result;
        
    }
    render() {
        const {studentList} = this.props;
        const student = this.studentAverage(studentList);
        return (
            <div className="header container-fluid">
                <div className="col-xs-12 col-md-12 page-header">
                    <h1 className="hidden-xs">Student Grade Table
                        <small className="pull-right ">Grade Average : <span className="avgGrade label label-default">{student}</span></small>
                    </h1>
                    <h3 className="visible-xs">Student Grade Table
                        <small className="pull-right">Grade Average : <span className="avgGrade label label-default">{student}</span></small>
                    </h3>
                </div>
            </div>
        )

    }
}

function mapStateToProps(state){
    return{
        studentList: state.studentListReducer.studentList
    }
}
export default connect(mapStateToProps, {getStudentList})(Header);