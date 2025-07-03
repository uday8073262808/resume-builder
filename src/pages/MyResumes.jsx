import { useEffect, useState } from 'react';
import axios from 'axios';

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/resumes', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumes(response.data.resumes);
      } catch (err) {
        console.error('Error fetching resumes:', err);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Resumes</h2>
      {resumes.length === 0 ? (
        <p>No resumes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <div key={resume.id} className="p-4 border rounded shadow">
              <h3 className="text-lg font-bold">{resume.title}</h3>
              <pre className="text-sm text-gray-700">{JSON.stringify(resume.data, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyResumes;
