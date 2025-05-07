import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/SideBar';
import AddStudentForm from './components/AddStudentForm';
import StudentsList from './components/StudentsList';

const App = () => {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Navigate to="/students" />} />
        <Route path="/students" element={<StudentsList />} />
        <Route path="/students/new" element={<AddStudentForm />} />
      </Routes>
    </Router>
  );
};

export default App;
