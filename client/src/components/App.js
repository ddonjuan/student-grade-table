import React, { Component } from 'react';
import Counter from './counter';
import './App.css';
import AddStudent from './add_student';
import StudentList from './student_list'
import Header from './header';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <AddStudent />
        <StudentList />
      </div>
    );
  }
}

export default App;
