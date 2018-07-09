import React, { Component } from 'react';
import DeleteWarningModal from './delete_warning_modal';
import { connect } from 'react-redux';
import { updateInput, addStudent, getStudentList, clearInput } from '../actions';

class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state={
            nameValidation:false,
            classValidation:false,
            gradeValidation:false,
            revealErrors: false
        }
        this.getDataFromServer();
        this.clearInputData = this.clearInputData.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.getDataFromServer = this.getDataFromServer.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    classNameValidation(student){
        this.setState({
            revealErrors: true
        })

        var studentValidation = /[a-zA-Z]+.*|.*[a-zA-Z]+|.*[a-zA-Z]+.*/.test(student);
        if(studentValidation && student.length - 1 > 2){
            console.log("this is the string inside the val", student.length);
            this.setState({
                nameValidation: true,
                revealErrors:false
            });
            return
        }
        else{
            this.setState({
                nameValidation:false
            })
            return;   

        }

        // console.log("student boolean top: ", studentValidation);

        // for(let key in this.props.form){
        //     console.log("PPPFPFPFPFPFPFPFPFP",key);
        //     switch(key){
        //         case key === 'student_name':
        //             let studentValidation = /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(key);
        //             console.log("name in the classNameValidation: ", key);
        //             console.log("student boolean PGPGPGPGPGPGPGPGPGPGPGP: ", studentValidation);
        //             if(!studentValidation){
        //                 this.setState({
        //                     nameValidation: false
        //                 })
        //                 console.log("this is the state: ", this.state.nameValidation);
        //                 return
        //             }
    
        //         case key === 'class_name':
        //             let classValidation = /^[A-Za-z0-9\s-]+$/.test(key);
        //             if(!classValidation){
        //                 this.setState({
        //                     classValidation: false
        //                 });
        //                 return
        //             }
    
        //         case key === 'grade_value':
        //             let  gradeValidation = /[0-9]+(\.[0-9][0-9]?)?/.test(key);
        //             if(!gradeValidation){
        //                 this.setState({
        //                     gradeValidation: false
        //                 })
        //                 return
        //             }
    
        //     }
        // }        
    }

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
        this.clearInputData();
    }
    
    handleInputChange(event) {
        const { student_name, class_name, grade_value } = this.props.form;
        const { value, name } = event.target;
        this.props.updateInput(name, value);
        this.classNameValidation(student_name);

    }

    clearInputData(){
        for(let key in this.props.form){
            this.props.clearInput(key);
        }
    }

    render() {
        const { student_name, class_name, grade_value } = this.props.form;
        const {nameValidation, classValidation, gradeValidation, revealErrors} = this.state;
        console.log("this is the student name in the form: ", student_name.length);
        console.log("this is the name validation state: ", nameValidation);
        const showError = revealErrors ? 'bones red' : '';
        const validInput = nameValidation ? 'green' : 'red';
    

        
        return (
            <div className="header">
                <div className="student-add-form col-xs-12 col-md-3 col-lg-3 form-group pull-right">
                    <h4>Add Student</h4>
                    <DeleteWarningModal/>
                    <div className={` ${validInput} input-group form-group simplebox`}>
                        <span className={`${validInput} input-group-addon`}>
                            <span className="glyphicon glyphicon-user"></span>
                        </span>
                        <input value={student_name} onChange={this.handleInputChange} type="text" className={`form-control ${validInput}`} name="student_name" id="studentName" placeholder="Student Name" />
                    </div>
                    <div className={`reveal ${showError}`}><div>Name must start with a letter and contain at least 2 characters</div></div>

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