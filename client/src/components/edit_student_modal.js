import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getStudentList, updateStudent } from '../actions';

class EditModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            student_name: '',
            grade_value: '',
            class_name: ''
        }

        this.editStudent = this.editStudent.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.populateEditFields = this.populateEditFields.bind(this);        
    }

    componentDidMount() {
        this.populateEditFields();
    }

    async populateEditFields() {
        await this.setState({ ...this.props.currentStudent });
    }

    async getDataFromServer() {
        await this.props.getStudentList();
    }

    async editStudent(){
        const student = { ...this.state };
        await this.props.updateStudent(student);
        await this.getDataFromServer();
        this.props.toggleEditModal();
    }

    handleInputChange(event) {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        });
    }

    render(){
        const { student_name, class_name, grade_value } = this.state;

        return(
            <div className="modal show">
                <div className="modal-content">
                    <span onClick={this.props.toggleEditModal} className="close-btn">&times;</span>
                    <h2 className="page-header title">Edit Student</h2>
                    <h5>Student Record</h5>
                    <div className="student-info">
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
                            <input value={grade_value} onChange={this.handleInputChange} type="number" className="form-control" name="grade_value" id="studentGrade"
                                placeholder="Student Grade" />
                        </div>
                    </div>    
                    <div className="button-holder">
                        <button onClick={this.editStudent} className="confirm">
                            Update
                        </button>
                        <button onClick={this.props.toggleEditModal} className="cancel">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>  
        )  
    }  
}

export default connect(null, { getStudentList, updateStudent})(EditModal);
