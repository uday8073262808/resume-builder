import React from 'react';

const Education = ({ formData, setFormData }) => {
  return (
    <div>
      <h3>Education</h3>
      <input
        type="text"
        placeholder="College Name"
        value={formData.college}
        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
      />
    </div>
  );
};

export default Education;
