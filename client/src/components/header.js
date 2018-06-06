import React, { Component } from 'react';

class Header extends Component {
    render() {
        return(
            <div classNameName="header">
            <div className="col-xs-12 col-md-12 page-header">
        <h1 className="hidden-xs">Student Grade Table
            <small className="pull-right ">Grade Average : <span className="avgGrade label label-default">0</span></small>
                </h1>
        <h3 className="visible-xs">Student Grade Table
            <small className="pull-right">Grade Average : <span className="avgGrade label label-default">0</span></small>
                </h3>
            </div>
        </div>
        )

    }
}
export default Header;