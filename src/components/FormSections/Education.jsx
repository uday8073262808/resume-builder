import React from 'react';

const Education = ({ formData, setFormData }) => {
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="step-box">
      <h3 style={{ marginBottom: '16px' }}>Education</h3>

      <label>College Name</label>
      <input
        type="text"
        value={formData.college}
        onChange={(e) => handleChange('college', e.target.value)}
        placeholder="e.g., Indian Institute of Technology"
      />

      <label>Degree / Course</label>
      <input
        type="text"
        value={formData.degree || ''}
        onChange={(e) => handleChange('degree', e.target.value)}
        placeholder="e.g., B.Tech in Computer Science"
      />

      <label>Year of Graduation</label>
      <input
        type="text"
        value={formData.graduationYear || ''}
        onChange={(e) => handleChange('graduationYear', e.target.value)}
        placeholder="e.g., 2025"
      />
    </div>
  );
};

export default Education;
