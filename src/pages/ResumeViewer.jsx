// ResumeViewer.jsx (pages/ResumeViewer.jsx)
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ResumeViewer() {
  const { id } = useParams();
  const [resume, setResume] = useState(null);
  const token = localStorage.getItem('token');
  const resumeRef = useRef();

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/resumes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = res.data.resumes.find((r) => r.id.toString() === id);
        setResume(found);
      } catch (err) {
        console.error('Error fetching resume:', err);
      }
    };
    fetchResume();
  }, [id, token]);

  const handleDownload = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
    pdf.save(`${resume.title || 'resume'}.pdf`);
  };

  if (!resume) return <p className="p-6">Loading resume...</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{resume.title}</h2>
        <button
          onClick={handleDownload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Download PDF
        </button>
      </div>

      <div ref={resumeRef} className="p-4 bg-white shadow rounded">
        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(resume.data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default ResumeViewer;
