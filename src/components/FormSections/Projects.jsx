import React from 'react';

const Projects = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, currentProject: e.target.value });
  };

  const addProject = () => {
    if (formData.currentProject.trim() === '') return;

    setFormData({
      ...formData,
      projects: [...formData.projects, formData.currentProject.trim()],
      currentProject: '',
    });
  };

  const removeProject = (index) => {
    const updatedProjects = [...formData.projects];
    updatedProjects.splice(index, 1);
    setFormData({ ...formData, projects: updatedProjects });
  };

  return (
    <div>
      <h3>Projects</h3>
      <input
        type="text"
        placeholder="Enter project name or description"
        value={formData.currentProject}
        onChange={handleChange}
      />
      <button onClick={addProject} style={{ marginLeft: '8px' }}>Add</button>
      <ul>
        {formData.projects.map((proj, index) => (
          <li key={index}>
            {proj} <button onClick={() => removeProject(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
