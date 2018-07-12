import React, { Component } from "react";
import WarningModal from './delete_warning_modal';
import EditModal from './edit_student_modal';

class StudentRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editModal: false,
            deleteModal: false
        }

        this.toggleEditModal = this.toggleEditModal.bind(this);
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
    }
    
    toggleEditModal() {
        const { editModal } = this.state;

        this.setState({
            editModal: !editModal
        });
    }

    toggleDeleteModal() {
        const { deleteModal } = this.state;

        this.setState({
            deleteModal: !deleteModal
        });
    }

    render() {
        const { student_name, class_name, grade_value } = this.props.student;
        const { editModal, deleteModal } = this.state;

        return (
            <tr>
                <td>{student_name}</td>
                <td>{class_name}</td>
                <td>{grade_value}</td>
                <td>
                    <div>
                        <button className="btn btn-warning" onClick={this.toggleEditModal}>Edit</button>
                    </div>
                </td>
                <td>
                    <div>
                        <button onClick={this.toggleDeleteModal}
                            className="btn btn-danger">Delete</button>

                        { deleteModal ? <WarningModal toggleDeleteModal={this.toggleDeleteModal} currentStudent={this.props.student} /> : null }

                        { editModal ? <EditModal toggleEditModal={this.toggleEditModal} currentStudent={this.props.student} /> : null }
                    </div>
                </td>
            </tr>
        )
    }
}
export default StudentRow;


