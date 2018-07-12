import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInput, addStudent, getStudentList, clearInput } from '../actions';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameValidation: false,
            classValidation: false,
            gradeValidation: false,
            revealNameErrors: false,
            revealGradeErrors: false,
            revealClassErrors: false,
            revealNameRedColor: false,
            revealGradeRedColor: false,
            revealClassRedColor: false

        }
        this.getDataFromServer();
        this.clearInputData = this.clearInputData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    classNameValidation(name, value) {
        switch (name) {
            case 'student_name':
                var studentValidation = /[a-zA-Z]+.*|.*[a-zA-Z]+|.*[a-zA-Z]+.*/.test(value);
                if (studentValidation && value.length > 1) {
                    this.setState({
                        nameValidation: true,
                        revealNameErrors: false,
                        revealNameRedColor: false
                    });
                    return
                }
                else {
                    this.setState({
                        nameValidation: false,
                        revealNameErrors: true,
                        revealNameRedColor: true
                    })
                    return;

                }
            case 'class_name':
                var classNameValidation = /^[a-zA-Z]+[a-zA-Z0-9\s\.]{1,30}$/.test(value);
                if (classNameValidation && value.length > 1) {
                    console.log("this is the string inside the val", value.length);
                    this.setState({
                        classValidation: true,
                        revealClassErrors: false,
                        revealClassRedColor: false
                    });
                    return
                }
                else {
                    this.setState({
                        classValidation: false,
                        revealClassErrors: true,
                        revealClassRedColor: true
                    })
                    return;

                }
            case 'grade_value':
                if (value >= 0 && value <= 100 && value.length > 0 ) {
                    console.log("this is the string inside the val", value.length);
                    this.setState({
                        gradeValidation: true,
                        revealGradeErrors: false,
                        revealGradeRedColor: false
                    });
                    return
                }
                else {
                    this.setState({
                        gradeValidation: false,
                        revealGradeErrors: true,
                        revealGradeRedColor: true
                    })
                    return;

                }
            default:
                return console.log('nope sorry');
        }

    }

    handleSubmit(event) {
        event.preventDefault();
    }

    async getDataFromServer() {
        await this.props.getStudentList();
        const { studentList } = this.props;
    }

    async handleAddStudent() {
        const {nameValidation, gradeValidation, classValidation} = this.state;
        const { student_name, class_name, grade_value } = this.props.form;

        const student = {
            class_name,
            student_name,
            grade_value
        };
        if(nameValidation && gradeValidation && classValidation){
            await this.props.addStudent(student);
            this.getDataFromServer();
            this.clearInputData();

            this.setState({
                nameValidation:false,
                classValidation: false,
                gradeValidation: false
            })
        }
        if(student_name.length === 0 && class_name.length === 0 && grade_value.length === 0){
            this.setState({
                classValidation: false,
                revealClassErrors: true,
                revealClassRedColor: true,
                nameValidation: false,
                revealNameErrors: true,
                revealNameRedColor: true,
                gradeValidation: false,
                revealGradeErrors: true,
                revealGradeRedColor: true

            });
        }
    }

    handleInputChange(event) {
        const { value, name } = event.target;
        console.log("THIS IS THE VALUE IN HANDLEINPUTCHANGE: ", value);
        console.log("THIS IS THE NAME IN HANDLINPUTCHANGE: ", name);
        this.props.updateInput(name, value);
        this.classNameValidation(name, value);

    }

    clearInputData() {
        for (let key in this.props.form) {
            this.props.clearInput(key);
        }
        this.setState({
            nameValidation: false,
            classValidation: false,
            gradeValidation: false,
            revealNameErrors: false,
            revealGradeErrors: false,
            revealClassErrors: false,
            revealNameRedColor: false,
            revealGradeRedColor: false,
            revealClassRedColor: false

        })
    }

    render() {
        const { student_name, class_name, grade_value } = this.props.form;
        const { nameValidation, classValidation, gradeValidation, revealNameErrors,revealGradeErrors, revealClassErrors, revealNameRedColor, revealGradeRedColor, revealClassRedColor } = this.state;

        const showNameError = revealNameErrors ? 'reveal red' : '';
        const showGradeError = revealGradeErrors ? 'reveal red' : '';
        const showClassError = revealClassErrors ? 'reveal red' : '';

        const nameInput = nameValidation ? 'green' : '';
        const gradeInput = gradeValidation ? 'green' : '';
        const classInput = classValidation ? 'green' : '';

        const revealNameRed = revealNameRedColor ? 'red' : '';
        const revealGradeRed = revealGradeRedColor ? 'red': '';
        const revealClassRed = revealClassRedColor ? 'red' : '';

        return (
            <div className="header">
                <div className="student-add-form col-xs-12 col-md-3 col-lg-3 form-group pull-right">
                    <h4>Add Student</h4>

                    <DeleteWarningModal />

                    <div className={` ${nameInput} ${revealNameRed} input-group form-group simplebox`}>
                        <span className={`${nameInput} ${revealNameRed} input-group-addon`}>
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                        <input value={student_name} onChange={this.handleInputChange} type="text" className={`form-control ${nameInput} ${revealNameRed}`} name="student_name" id="studentName" placeholder="Student Name" />
                    </div>
                    <div className={`suppress ${showNameError}`}><div>Name must start with a letter and contain at least 2 characters</div></div>

                    <div className={` ${classInput} ${revealClassRed}  input-group form-group simplebox`}>
                        <span className={`${classInput} ${revealClassRed} input-group-addon`}>
                            <span className="glyphicon glyphicon-list-alt"></span>
                        </span>
                        <input value={class_name} onChange={this.handleInputChange} type="text" className={`form-control ${classInput} ${revealClassRed} `} name="class_name" id="course"
                            placeholder="Student Course" />
                    </div>
                    <div className={`suppress ${showClassError}`}><div>Class Input must start with at least two characters</div></div>

                    <div className={` ${gradeInput} ${revealGradeRed} input-group form-group simplebox`}>
                        <span className={`${gradeInput} ${revealGradeRed} input-group-addon`}>
                            <span className="glyphicon glyphicon-education"></span>
                        </span>
                        <input value={grade_value} onChange={this.handleInputChange} type="number" className={`form-control ${gradeInput} ${revealGradeRed}`} name="grade_value" id="studentGrade"
                            placeholder="Student Grade" />
                    </div>
                    <div className={`suppress ${showGradeError}`}><div>Grade input must be 0 - 100</div></div>

                    <button onClick={this.handleAddStudent} type="button" className="btn btn-success" >Add</button>
                    <button onClick={this.clearInputData} type="button" className="btn btn-secondary">Clear</button>
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
export default connect(mapStateToProps, { updateInput, addStudent, getStudentList, clearInput })(AddStudent);