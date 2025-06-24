import React from 'react';

const ThemeSelector = ({ formData, setFormData }) => {
  const handleThemeChange = (e) => {
    setFormData({ ...formData, theme: e.target.value });
  };

  const handleLayoutChange = (e) => {
    setFormData({ ...formData, layout: e.target.value });
  };

  const handleArrayInput = (field, value) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map((item) => item.trim()),
    });
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: 'auto' }}>
      {/* Theme Selector */}
      <h3 style={{ marginBottom: '8px' }}>🎨 Choose Resume Theme</h3>
      <select
        value={formData.theme}
        onChange={handleThemeChange}
        style={{ padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '6px' }}
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="elegant">Elegant</option>
      </select>

      <hr style={{ margin: '24px 0' }} />

      {/* Layout Selector */}
      <h3 style={{ marginBottom: '8px' }}>🗂️ Choose Resume Layout</h3>
      {['classic', 'modern', 'minimal'].map((layout) => (
        <label key={layout} style={{ display: 'block', marginBottom: '10px' }}>
          <input
            type="radio"
            name="layout"
            value={layout}
            checked={formData.layout === layout}
            onChange={handleLayoutChange}
          />{' '}
          {layout.charAt(0).toUpperCase() + layout.slice(1)}
        </label>
      ))}

      <hr style={{ margin: '24px 0' }} />

      {/* Additional Info */}
      <h3 style={{ marginBottom: '12px' }}>🔧 Additional Details</h3>

      {/* Certifications */}
      <label style={{ fontWeight: '600' }}>Certifications (comma-separated)</label>
      <input
        type="text"
        value={formData.certifications?.join(', ') || ''}
        onChange={(e) => handleArrayInput('certifications', e.target.value)}
        placeholder="Eg: AWS Certified, Google UX Design"
        style={{ marginBottom: '16px', padding: '10px', width: '100%', borderRadius: '6px' }}
      />

      {/* Languages */}
      <label style={{ fontWeight: '600' }}>Languages (comma-separated)</label>
      <input
        type="text"
        value={formData.languages?.join(', ') || ''}
        onChange={(e) => handleArrayInput('languages', e.target.value)}
        placeholder="Eg: English, Hindi, Spanish"
        style={{ marginBottom: '16px', padding: '10px', width: '100%', borderRadius: '6px' }}
      />

      {/* Hobbies */}
      <label style={{ fontWeight: '600' }}>Hobbies (comma-separated)</label>
      <input
        type="text"
        value={formData.hobbies?.join(', ') || ''}
        onChange={(e) => handleArrayInput('hobbies', e.target.value)}
        placeholder="Eg: Drawing, Football, Blogging"
        style={{ padding: '10px', width: '100%', borderRadius: '6px' }}
      />
    </div>
  );
};

export default ThemeSelector;
