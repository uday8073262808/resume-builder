import React from 'react';

const PersonalInfo = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="step-box">
      <h3 style={{ marginBottom: '16px' }}>Personal Information</h3>

      {/* Name */}
      <label htmlFor="name">Full Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={handleChange}
      />

      {/* Email */}
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={handleChange}
      />

      {/* Phone */}
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter your phone number"
        value={formData.phone}
        onChange={handleChange}
      />

      <h4 style={{ margin: '24px 0 8px' }}>🌐 Online Profiles</h4>

      {/* LinkedIn */}
      <label htmlFor="linkedin">LinkedIn URL</label>
      <input
        type="url"
        id="linkedin"
        name="linkedin"
        placeholder="https://linkedin.com/in/your-profile"
        value={formData.linkedin || ''}
        onChange={handleChange}
      />

      {/* GitHub */}
      <label htmlFor="github">GitHub URL</label>
      <input
        type="url"
        id="github"
        name="github"
        placeholder="https://github.com/your-username"
        value={formData.github || ''}
        onChange={handleChange}
      />

      {/* Portfolio */}
      <label htmlFor="portfolio">Portfolio URL</label>
      <input
        type="url"
        id="portfolio"
        name="portfolio"
        placeholder="https://yourportfolio.com"
        value={formData.portfolio || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default PersonalInfo;
