// App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MyResumes from './pages/MyResumes';
import FormSections from './components/FormSections';
import SavedResumes from './pages/SavedResumes';
import ResumeViewer from './pages/ResumeViewer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-resumes" element={<MyResumes />} />
        <Route path="/saved-resumes" element={<SavedResumes />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-resume"
          element={
            <ProtectedRoute>
              <FormSections />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-viewer/:id"
          element={
            <ProtectedRoute>
              <ResumeViewer />
            </ProtectedRoute>
          }
        />

        <Route path="/resume-builder" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
