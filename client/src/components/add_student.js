import React, { Component } from 'react';

class AddStudent extends Component {
    render() {
        return(
            <div classNameName="header">
            <div className="student-add-form col-xs-12 col-md-3 form-group pull-right">
    <h4>Add Student</h4>
    <div className="input-group form-group">
        <span className="input-group-addon">
            <span className="glyphicon glyphicon-user"></span>
        </span>
        <input type="text" className="form-control" name="studentName" id="studentName" placeholder="Student Name"/>
    </div>
    <div className="input-group form-group">
        <span className="input-group-addon">
            <span className="glyphicon glyphicon-list-alt"></span>
        </span>
        <input type="text" className="form-control" name="course" id="course"
               placeholder="Student Course"/>
    </div>
    <div className="input-group form-group">
        <span className="input-group-addon">
            <span className="glyphicon glyphicon-education"></span>
        </span>
        <input type="text" className="form-control" name="studentGrade" id="studentGrade"
               placeholder="Student Grade"/>
    </div>
    <button type="button" className="btn btn-success" onclick="">Add</button>
    <button type="button" className="btn btn-default" onclick="">Cancel</button>
    <button type="button" className="btn btn-primary">Retrieve Data</button>
</div>
    </div>
        )

    }
}
export default AddStudent;