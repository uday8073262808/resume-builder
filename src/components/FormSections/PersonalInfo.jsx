import React from 'react';

const PersonalInfo = ({ data, setData }) => {
  const personal = data || {}; // ✅ this is now correct

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...personal,   // ✅ spreading current values
      [name]: value,
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
        value={personal.name || ''}
        onChange={handleChange}
      />

      {/* Email */}
      <label htmlFor="email">Email Address</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Enter your email"
        value={personal.email || ''}
        onChange={handleChange}
      />

      {/* Phone */}
      <label htmlFor="phone">Phone Number</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Enter your phone number"
        value={personal.phone || ''}
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
        value={personal.linkedin || ''}
        onChange={handleChange}
      />

      {/* GitHub */}
      <label htmlFor="github">GitHub URL</label>
      <input
        type="url"
        id="github"
        name="github"
        placeholder="https://github.com/your-username"
        value={personal.github || ''}
        onChange={handleChange}
      />

      {/* Portfolio */}
      <label htmlFor="portfolio">Portfolio URL</label>
      <input
        type="url"
        id="portfolio"
        name="portfolio"
        placeholder="https://yourportfolio.com"
        value={personal.portfolio || ''}
        onChange={handleChange}
      />
    </div>
  );
};

export default PersonalInfo;
