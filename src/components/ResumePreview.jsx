import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumePreview = ({ formData }) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * (pdfWidth - 40)) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 20, 20, pdfWidth - 40, pdfHeight, '', 'FAST');
    pdf.save(`${formData.name || 'resume'}.pdf`);
  };

  const themeStyles = {
    light: { backgroundColor: '#ffffff', color: '#2C3E50' },
    dark: { backgroundColor: '#1a1a1a', color: '#f1f1f1' },
    elegant: { backgroundColor: '#fdf6e3', color: '#3c3c3c' },
  };

  const theme = themeStyles[formData.theme] || themeStyles.light;
  const sectionStyle = { marginBottom: '28px' };
  const headingStyle = {
    fontSize: '20px',
    marginBottom: '12px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '4px',
  };

  const renderLink = (label, url) =>
    url ? (
      <p>
        <strong>{label}:</strong>{' '}
        <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
      </p>
    ) : null;

  return (
    <div className="container">
      <div
        ref={previewRef}
        className="preview-container"
        style={{
          ...theme,
          padding: '36px',
          borderRadius: '10px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          fontFamily: 'Inter, sans-serif',
          position: 'relative',
        }}
      >
        {/* Header */}
        <h1 style={{ fontSize: '30px', marginBottom: '4px' }}>{formData.name}</h1>
        <p style={{ fontSize: '16px' }}>{formData.email} | {formData.phone}</p>

        {/* Links */}
        {renderLink('LinkedIn', formData.linkedin)}
        {renderLink('GitHub', formData.github)}
        {renderLink('Portfolio', formData.portfolio)}

        {/* Education */}
        {(formData.college || formData.degree || formData.graduationYear) && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>🎓 Education</h2>
            {formData.degree && <p style={{ fontWeight: '600' }}>{formData.degree}</p>}
            {formData.college && <p>{formData.college}</p>}
            {formData.graduationYear && (
              <p style={{ color: '#777' }}>🎓 Graduation Year: {formData.graduationYear}</p>
            )}
          </div>
        )}

        {/* Work Experience */}
        {formData.experiences?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>💼 Work Experience</h2>
            {formData.experiences.map((exp, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <p><strong>{exp.jobTitle}</strong> at {exp.company}</p>
                <p><em>{exp.duration}</em></p>
                <p>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {formData.skills?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>🧠 Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#18BC9C',
                    color: '#fff',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {formData.projects?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>🚀 Projects</h2>
            {formData.projects.map((proj, index) => (
              <div key={index} style={{ marginBottom: '12px' }}>
                <p><strong>{proj.title}</strong></p>
                <p>{proj.description}</p>
                {Array.isArray(proj.technologies) && proj.technologies.length > 0 && (
                  <p><strong>Technologies:</strong> {proj.technologies.join(', ')}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {formData.certifications?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>📜 Certifications</h2>
            <ul style={{ paddingLeft: '20px' }}>
              {formData.certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Languages */}
        {formData.languages?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>🌐 Languages</h2>
            <p>{formData.languages.join(', ')}</p>
          </div>
        )}

        {/* Hobbies */}
        {formData.hobbies?.length > 0 && (
          <div style={sectionStyle}>
            <h2 style={headingStyle}>🎯 Hobbies & Interests</h2>
            <p>{formData.hobbies.join(', ')}</p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '40px',
          fontSize: '12px',
          color: '#aaa',
          textAlign: 'center',
          borderTop: '1px solid #ccc',
          paddingTop: '12px'
        }}>
          © {new Date().getFullYear()} ResumeForge · All rights reserved
        </div>
      </div>

      {/* Download */}
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <button onClick={handleDownload}>⬇️ Download PDF</button>
      </div>
    </div>
  );
};

export default ResumePreview;
