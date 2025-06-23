import React, { useState, useEffect } from 'react';
import PersonalInfo from '../components/FormSections/PersonalInfo';
import Education from '../components/FormSections/Education';
import Experience from '../components/FormSections/Experience';
import Skills from '../components/FormSections/Skills';
import Projects from '../components/FormSections/Projects';
import ResumePreview from '../components/ResumePreview';
import ThemeSelector from '../components/FormSections/ThemeSelector';

const Home = () => {
  // ✅ Load from localStorage or start fresh
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('resumeData');
    return saved
      ? JSON.parse(saved)
      : {
          name: '',
          email: '',
          phone: '',
          college: '',
          jobTitle: '',
          company: '',
          duration: '',
          skills: [],
          currentSkill: '',
          projects: [],
          currentProject: '',
          theme: 'light',
          layout: 'classic',
        };
  });

  const [step, setStep] = useState(1);

  // ✅ Auto-save to localStorage on any change
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(formData));
  }, [formData]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 7));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Education formData={formData} setFormData={setFormData} />;
      case 3:
        return <Experience formData={formData} setFormData={setFormData} />;
      case 4:
        return <Skills formData={formData} setFormData={setFormData} />;
      case 5:
        return <Projects formData={formData} setFormData={setFormData} />;
      case 6:
        return <ThemeSelector formData={formData} setFormData={setFormData} />;
      case 7:
        return <ResumePreview formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="form-section" style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2 style={{ textAlign: 'center' }}>Resume Builder - Step {step}/7</h2>

      {renderStep()}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <button onClick={prevStep} disabled={step <= 1}>Back</button>
        <button onClick={nextStep} disabled={step >= 7}>Next</button>
      </div>

      {/* ✅ Reset Option */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => {
            localStorage.removeItem('resumeData');
            window.location.reload();
          }}
          style={{
            marginTop: '10px',
            backgroundColor: '#d9534f',
            color: '#fff',
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear Resume & Restart
        </button>
      </div>
    </div>
  );
};

export default Home;
