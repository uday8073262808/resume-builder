// src/pages/CreateResume.jsx
import React, { useState } from 'react';
import PersonalInfo from '../components/FormSections/PersonalInfo';
import Education from '../components/FormSections/Education';
import Experience from '../components/FormSections/Experience';
import Skills from '../components/FormSections/Skills';
import Projects from '../components/FormSections/Projects';
import AdditionalInfo from '../components/FormSections/AdditionalInfo';
import axios from 'axios';

const CreateResume = () => {
  const [resumeData, setResumeData] = useState({
    personal: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    additional: {}
  });

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/resumes', resumeData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Resume saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save resume.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Resume</h1>
      <PersonalInfo setData={(data) => setResumeData(prev => ({ ...prev, personal: data }))} />
      <Education setData={(data) => setResumeData(prev => ({ ...prev, education: data }))} />
      <Experience setData={(data) => setResumeData(prev => ({ ...prev, experience: data }))} />
      <Skills setData={(data) => setResumeData(prev => ({ ...prev, skills: data }))} />
      <Projects setData={(data) => setResumeData(prev => ({ ...prev, projects: data }))} />
      <AdditionalInfo setData={(data) => setResumeData(prev => ({ ...prev, additional: data }))} />
      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded" onClick={handleSubmit}>
        Save Resume
      </button>
    </div>
  );
};

export default CreateResume;
