import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ResumePreview from '../components/ResumePreview'; // adjust if your preview file is in a different folder

function SavedResumes() {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/resumes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setResumes(response.data.resumes);
      } catch (error) {
        console.error('Error fetching resumes:', error);
        alert('Error fetching resumes');
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Saved Resumes</h1>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        resumes.map((resume) => (
          <div key={resume.id} className="bg-white p-4 shadow rounded mb-6">
            <h2 className="text-xl font-semibold mb-2">{resume.title}</h2>
            <ResumePreview formData={resume.data} />
          </div>
        ))
      )}
    </div>
  );
}

export default SavedResumes;
