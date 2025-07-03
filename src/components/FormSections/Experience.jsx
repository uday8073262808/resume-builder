import React from 'react';

const Experience = ({ data = [], setData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...data];
    updated[index][field] = value;
    setData(updated);
  };

  const addExperience = () => {
    setData([...data, { jobTitle: '', company: '', duration: '' }]);
  };

  const removeExperience = (index) => {
    const updated = [...data];
    updated.splice(index, 1);
    setData(updated);
  };

  return (
    <div className="step-box">
      <h3 style={{ marginBottom: '16px' }}>Work Experience</h3>

      {data.map((exp, index) => (
        <div
          key={index}
          className="step-box"
          style={{ background: '#f9f9f9', padding: '12px', marginBottom: '12px' }}
        >
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

          {data.length > 1 && (
            <button
              onClick={() => removeExperience(index)}
              style={{
                backgroundColor: '#e74c3c',
                color: '#fff',
                padding: '4px 8px',
                marginTop: '8px',
                borderRadius: '4px',
              }}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={addExperience}
          style={{
            marginTop: '10px',
            backgroundColor: '#3498db',
            color: '#fff',
            padding: '6px 12px',
            borderRadius: '4px',
          }}
        >
          + Add Experience
        </button>
      </div>
    </div>
  );
};

export default Experience;
