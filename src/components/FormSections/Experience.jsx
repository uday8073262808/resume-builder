import React from 'react';

const Experience = ({ formData, setFormData }) => {
  return (
    <div>
      <h3>Work Experience</h3>
      <input
        type="text"
        placeholder="Job Title"
        value={formData.jobTitle}
        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
      /><br />
      <input
        type="text"
        placeholder="Company"
        value={formData.company}
        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
      /><br />
      <input
        type="text"
        placeholder="Duration (e.g. Jan 2022 - May 2023)"
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
      />
    </div>
  );
};

export default Experience;
