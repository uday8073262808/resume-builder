import React from 'react';

const Projects = ({ formData, setFormData }) => {
  const handleChange = (index, field, value) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: '', description: '', technologies: '' },
      ],
    });
  };

  const removeProject = (index) => {
    const updated = [...formData.projects];
    updated.splice(index, 1);
    setFormData({ ...formData, projects: updated });
  };

  return (
    <div className="step-box">
      <h3 style={{ marginBottom: '16px' }}>Projects</h3>

      {formData.projects.map((proj, index) => (
        <div key={index} className="step-box" style={{ marginBottom: '16px', background: '#f9f9f9' }}>
          <label>Project Title</label>
          <input
            type="text"
            value={proj.title}
            onChange={(e) => handleChange(index, 'title', e.target.value)}
            placeholder="e.g., Portfolio Website"
          />

          <label>Description</label>
          <textarea
            rows={3}
            value={proj.description}
            onChange={(e) => handleChange(index, 'description', e.target.value)}
            placeholder="Brief summary of your project and outcomes"
          />

          <label>Technologies Used</label>
          <input
            type="text"
            value={proj.technologies}
            onChange={(e) => handleChange(index, 'technologies', e.target.value)}
            placeholder="e.g., React, Node.js, MySQL"
          />

          {formData.projects.length > 1 && (
            <button
              onClick={() => removeProject(index)}
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
        <button onClick={addProject} style={{ marginTop: '10px' }}>
          + Add Project
        </button>
      </div>
    </div>
  );
};

export default Projects;
