import React from 'react';

const Experience = ({ formData, setFormData }) => {
  const experiences = formData.experiences || [];

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setFormData({ ...formData, experiences: updated });
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [...experiences, { jobTitle: '', company: '', duration: '' }],
    });
  };

  const removeExperience = (index) => {
    const updated = [...experiences];
    updated.splice(index, 1);
    setFormData({ ...formData, experiences: updated });
  };

  return (
    <div className="step-box">
      <h3 style={{ marginBottom: '16px' }}>Work Experience</h3>

      {experiences.map((exp, index) => (
        <div key={index} className="step-box" style={{ background: '#f9f9f9' }}>
          <label>Job Title</label>
          <input
            type="text"
            value={exp.jobTitle}
            onChange={(e) => handleChange(index, 'jobTitle', e.target.value)}
            placeholder="e.g., Frontend Developer"
          />

          <label>Company</label>
          <input
            type="text"
            value={exp.company}
            onChange={(e) => handleChange(index, 'company', e.target.value)}
            placeholder="e.g., Google"
          />

          <label>Duration</label>
          <input
            type="text"
            value={exp.duration}
            onChange={(e) => handleChange(index, 'duration', e.target.value)}
            placeholder="e.g., Jan 2022 - Dec 2022"
          />

          {experiences.length > 1 && (
            <button
              onClick={() => removeExperience(index)}
              style={{
                backgroundColor: '#e74c3c',
                marginTop: '8px',
              }}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div style={{ textAlign: 'center' }}>
        <button onClick={addExperience} style={{ marginTop: '10px' }}>
          + Add Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
