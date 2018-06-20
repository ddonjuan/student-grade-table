import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInput, addStudent, getStudentList } from '../actions';

class AddStudent extends Component {
    constructor(props) {
        super(props);

        this.getDataFromServer();
        // this.gradeAverage();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    // gradeAverage(){
    //     this.props.getStudentList();
    //     const {studentList} = this.props
    // }
    handleSubmit(event){
        event.preventDefault();
    }
    async getDataFromServer() {
        await this.props.getStudentList();
        const { studentList } = this.props;
    }
    
    async handleAddStudent() {
        const { student_name, class_name, grade_value } = this.props.form;

        const student = {
            class_name,
            student_name,
            grade_value
        };

        await this.props.addStudent(student);
        this.getDataFromServer();
    }
    handleInputChange(event) {
        const { value, name } = event.target;

        this.props.updateInput(name, value);
    }

    render() {
        const { student_name, class_name, grade_value } = this.props.form;
        return (
            <div className="header">
                <div className="student-add-form col-xs-12 col-md-3 form-group pull-right">
                    <h4>Add Student</h4>
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
                        <input value={grade_value} onChange={this.handleInputChange} type="text" className="form-control" name="grade_value" id="studentGrade"
                            placeholder="Student Grade" />
                    </div>
                        <button onClick={this.handleAddStudent} type="button" className="btn btn-success" >Add</button>
                        <button type="button" className="btn btn-secondary" >Cancel</button>
                        <button onClick={this.getDataFromServer} type="button" className="btn btn-primary">Retrieve Data</button>

                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const { student_name, class_name, grade_value } = state.inputReducer;
    return {
        form: {
            class_name,
            student_name,
            grade_value
        },
        studentList: state.studentListReducer.studentList
    }
}
export default connect(mapStateToProps, { updateInput, addStudent, getStudentList })(AddStudent);