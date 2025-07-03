// FormSections.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PersonalInfo from './FormSections/PersonalInfo';
import Experience from './FormSections/Experience';
import Education from './FormSections/Education';
import Skills from './FormSections/Skills';
import Projects from './FormSections/Projects';
import ThemeSelector from './FormSections/ThemeSelector';

function FormSections() {
  const [formData, setFormData] = useState({
    personalInfo: {},
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
    hobbies: [],
    theme: 'light',
    layout: 'classic',
    title: '',
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to save the resume.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/resumes',
        {
          title: formData.title || 'Untitled Resume',
          data: formData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Resume saved successfully!');
      const resumeId = response.data.resumeId;
      navigate(`/resume-viewer/${resumeId}`);
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Create Resume</h1>

      <input
        type="text"
        placeholder="Enter resume title"
        className="mb-4 p-2 border rounded w-full"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />

      <PersonalInfo
        data={formData.personalInfo}
        setData={(newInfo) => setFormData((prev) => ({ ...prev, personalInfo: newInfo }))}
      />
      <Education
        data={formData.education}
        setData={(newEdu) => setFormData((prev) => ({ ...prev, education: newEdu }))}
      />
      <Experience
        data={formData.experience}
        setData={(newExp) => setFormData((prev) => ({ ...prev, experience: newExp }))}
      />
      <Projects formData={formData} setFormData={setFormData} />
      <Skills formData={formData} setFormData={setFormData} />
      <ThemeSelector formData={formData} setFormData={setFormData} />

      <button
        onClick={handleSave}
        className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Save Resume
      </button>
    </div>
  );
}

export default FormSections;
