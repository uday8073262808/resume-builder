import React from 'react';

const ThemeSelector = ({ formData, setFormData }) => {
  const handleThemeChange = (e) => {
    setFormData({ ...formData, theme: e.target.value });
  };

  const handleLayoutChange = (e) => {
    setFormData({ ...formData, layout: e.target.value });
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>🎨 Choose Resume Theme</h3>
      <select value={formData.theme} onChange={handleThemeChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="elegant">Elegant</option>
      </select>

      <hr style={{ margin: '20px 0' }} />

      <h3>🗂️ Choose Resume Layout</h3>
      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input
          type="radio"
          name="layout"
          value="classic"
          checked={formData.layout === 'classic'}
          onChange={handleLayoutChange}
        />{' '}
        Classic
      </label>

      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input
          type="radio"
          name="layout"
          value="modern"
          checked={formData.layout === 'modern'}
          onChange={handleLayoutChange}
        />{' '}
        Modern
      </label>

      <label style={{ display: 'block', marginBottom: '8px' }}>
        <input
          type="radio"
          name="layout"
          value="minimal"
          checked={formData.layout === 'minimal'}
          onChange={handleLayoutChange}
        />{' '}
        Minimal
      </label>
    </div>
  );
};

export default ThemeSelector;
