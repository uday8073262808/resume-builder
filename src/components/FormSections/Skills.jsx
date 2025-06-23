import React from 'react';

const Skills = ({ formData, setFormData }) => {
  const handleSkillChange = (e) => {
    setFormData({ ...formData, currentSkill: e.target.value });
  };

  const addSkill = () => {
    if (formData.currentSkill.trim() === '') return;

    setFormData({
      ...formData,
      skills: [...formData.skills, formData.currentSkill.trim()],
      currentSkill: '',
    });
  };

  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({ ...formData, skills: updatedSkills });
  };

  return (
    <div>
      <h3>Skills</h3>
      <input
        type="text"
        placeholder="Enter a skill"
        value={formData.currentSkill}
        onChange={handleSkillChange}
      />
      <button onClick={addSkill} style={{ marginLeft: '8px' }}>Add</button>
      <ul>
        {formData.skills.map((skill, index) => (
          <li key={index}>
            {skill} <button onClick={() => removeSkill(index)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Skills;
