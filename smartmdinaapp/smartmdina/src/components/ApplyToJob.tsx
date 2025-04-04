import React, { useState } from 'react';
import './Popup.css';

interface ApplyToJobProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: number; // Add jobId to the props
}

const ApplyToJob: React.FC<ApplyToJobProps> = ({ isOpen, onClose, jobId }) => {
  const [email, setEmail] = useState<string>('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !jobId) {
      alert('Please provide a valid email and job ID.');
      return;
    }

    const applicationData = {
      email,
      jobId,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/applications/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationData),
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        onClose();
      } else {
        alert('Failed to apply. Please try again.');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Apply for Job</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email Address:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              placeholder="Enter your email"
            />
          </label>
          <button type="submit">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyToJob;