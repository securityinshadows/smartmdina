// MyCVPage.tsx
import React from 'react';
import './css/MyCV.css';

const MyCVPage: React.FC = () => {
  return (
    <div className="my-cv">
      <h1>My CV</h1>
      
      <div className="cv-section">
        <h2>Personal Information</h2>
        <p>Name: John Doe</p>
        <p>Email: johndoe@example.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      
      <div className="cv-section">
        <h2>Education</h2>
        <ul>
          <li>Bachelor of Science in Computer Science - University X (2015-2019)</li>
        </ul>
      </div>

      <div className="cv-section">
        <h2>Work Experience</h2>
        <ul>
          <li>Software Engineer - Company A (2020-Present)</li>
          <li>Junior Developer - Company B (2019-2020)</li>
        </ul>
      </div>

      <button className="download-button">Download CV</button>
    </div>
  );
};

export default MyCVPage;
