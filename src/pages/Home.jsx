import React, { useState, useEffect } from 'react';
import PersonalInfo from '../components/FormSections/PersonalInfo';
import Education from '../components/FormSections/Education';
import Experience from '../components/FormSections/Experience';
import Skills from '../components/FormSections/Skills';
import Projects from '../components/FormSections/Projects';
import ResumePreview from '../components/ResumePreview';
import ThemeSelector from '../components/FormSections/ThemeSelector';

const Home = () => {
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved
      ? JSON.parse(saved)
      : {
        name: '',
        email: '',
        phone: '',
        college: '',
        experiences: [
          { jobTitle: '', company: '', duration: '' }
        ],
        skills: [],
        currentSkill: '',
        projects: [],
        currentProject: '',
        theme: 'light',
        layout: 'classic',
        certifications: [],
        languages: [],
        hobbies: [],

      };
  });

  const [step, setStep] = useState(1);

  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleReset = () => {
    localStorage.removeItem('resumeData');
    window.location.reload();
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2: return <Education formData={formData} setFormData={setFormData} />;
      case 3: return <Experience formData={formData} setFormData={setFormData} />;
      case 4: return <Skills formData={formData} setFormData={setFormData} />;
      case 5: return <Projects formData={formData} setFormData={setFormData} />;
      case 6: return <ThemeSelector formData={formData} setFormData={setFormData} />;
      case 7: return <ResumePreview formData={formData} />;
      default: return null;
    }
  };

  return (
    <div className="app-container">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Resume Builder - Step {step}/7
      </h2>

      {/* Render step inside card */}
      <div className="card">
        {renderStep()}
      </div>

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button className="btn-secondary" onClick={prevStep} disabled={step <= 1}>
          Back
        </button>
        <button className="btn-primary" onClick={nextStep} disabled={step >= 7}>
          Next
        </button>
      </div>

      {/* Reset Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="btn-secondary" onClick={handleReset}>
          Clear Resume & Restart
        </button>
      </div>
    </div>
  );
};

export default Home;
