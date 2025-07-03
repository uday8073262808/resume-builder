import React from 'react';

const Education = ({ data, setData }) => {
  const handleChange = (index, field, value) => {
    const updated = data.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    setData(updated);
  };

  const handleAdd = () => {
    setData([...data, { college: '', degree: '', graduationYear: '' }]);
  };

  const handleRemove = (index) => {
    const updated = data.filter((_, i) => i !== index);
    setData(updated);
  };

  return (
    <div className="step-box mb-6">
      <h3 className="text-xl font-semibold mb-4">Education</h3>

      {data.map((edu, index) => (
        <div key={index} className="mb-6 border p-4 rounded bg-white shadow-sm">
          <label>College Name</label>
          <input
            type="text"
            value={edu.college || ''}
            onChange={(e) => handleChange(index, 'college', e.target.value)}
            placeholder="e.g., Indian Institute of Technology"
            className="w-full p-2 mb-2 border rounded"
          />

          <label>Degree / Course</label>
          <input
            type="text"
            value={edu.degree || ''}
            onChange={(e) => handleChange(index, 'degree', e.target.value)}
            placeholder="e.g., B.Tech in Computer Science"
            className="w-full p-2 mb-2 border rounded"
          />

          <label>Year of Graduation</label>
          <input
            type="text"
            value={edu.graduationYear || ''}
            onChange={(e) => handleChange(index, 'graduationYear', e.target.value)}
            placeholder="e.g., 2025"
            className="w-full p-2 mb-2 border rounded"
          />

          {data.length > 1 && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="text-red-600 mt-2 underline"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAdd}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Education
      </button>
    </div>
  );
};

export default Education;
