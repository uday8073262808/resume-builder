import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FileText, PlusCircle, LogOut } from 'lucide-react';

function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/resumes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(res.data.resumes);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-gray-200 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Welcome to Your Dashboard</h1>
            <p className="text-gray-600">Manage and preview all your saved resumes.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <Link
            to="/create-resume"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 shadow"
          >
            <PlusCircle className="w-5 h-5" /> Create New Resume
          </Link>
        </div>

        <div className="bg-white rounded shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Saved Resumes</h2>
          {resumes.length > 0 ? (
            <ul className="space-y-3">
              {resumes.map((resume) => (
                <li
                  key={resume.id}
                  className="flex justify-between items-center p-4 bg-gray-50 border rounded hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="text-blue-500 w-5 h-5" />
                    <span className="font-medium text-gray-800">{resume.title}</span>
                  </div>
                  <Link
                    to={`/resume-viewer/${resume.id}`}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Preview & Download
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No resumes found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
