import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Students } from './pages/Students';
import { Employees } from './pages/Employees';
import { Courses } from './pages/Courses';
import { Classes } from './pages/Classes';
import { Financial } from './pages/Financial';
import { Salary } from './pages/Salary';
import './index.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/financial" element={<Financial />} />
          <Route path="/salary" element={<Salary />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
