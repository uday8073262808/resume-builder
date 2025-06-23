import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ResumePreview = ({ formData }) => {
  const previewRef = useRef();

  const handleDownload = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

  const themeStyles = {
    backgroundColor:
      formData.theme === 'dark'
        ? '#1a1a1a'
        : formData.theme === 'elegant'
        ? '#fdf6e3'
        : '#ffffff',
    color: formData.theme === 'dark' ? '#f1f1f1' : '#000',
    padding: '20px',
    borderRadius: '8px',
  };

  const renderLayout = () => {
    switch (formData.layout) {
      case 'modern':
        return (
          <div style={{ fontFamily: 'Segoe UI', lineHeight: 1.6 }}>
            <h1 style={{ borderBottom: '2px solid #333' }}>{formData.name}</h1>
            <p>{formData.email} | {formData.phone}</p>
            <p>{formData.college}</p>
            <h2>Experience</h2>
            <p>{formData.jobTitle} at {formData.company} ({formData.duration})</p>
            <h2>Skills</h2>
            <p>{formData.skills.join(', ')}</p>
            <h2>Projects</h2>
            <ul>{formData.projects.map((proj, i) => <li key={i}>{proj}</li>)}</ul>
          </div>
        );

      case 'minimal':
        return (
          <>
            <h2 style={{ textAlign: 'center' }}>{formData.name}</h2>
            <p style={{ textAlign: 'center' }}>
              {formData.email} | {formData.phone}
            </p>
            <p style={{ textAlign: 'center' }}>{formData.college}</p>
            <hr />
            <p><strong>Experience:</strong> {formData.jobTitle} at {formData.company} ({formData.duration})</p>
            <p><strong>Skills:</strong> {formData.skills.join(', ')}</p>
            <p><strong>Projects:</strong></p>
            <ul>{formData.projects.map((proj, i) => <li key={i}>{proj}</li>)}</ul>
          </>
        );

      case 'classic':
      default:
        return (
          <>
            <h2>My Resume</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Email:</strong> {formData.email}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>College:</strong> {formData.college}</p>

            <h3>Work Experience</h3>
            <p><strong>Job Title:</strong> {formData.jobTitle}</p>
            <p><strong>Company:</strong> {formData.company}</p>
            <p><strong>Duration:</strong> {formData.duration}</p>

            <h3>Skills</h3>
            <ul>
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h3>Projects</h3>
            <ul>
              {formData.projects.map((proj, index) => (
                <li key={index}>{proj}</li>
              ))}
            </ul>
          </>
        );
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <div ref={previewRef} style={themeStyles}>
        {renderLayout()}
      </div>

      <button onClick={handleDownload} style={{ marginTop: '10px' }}>
        Download PDF
      </button>
    </div>
  );
};

export default ResumePreview;
