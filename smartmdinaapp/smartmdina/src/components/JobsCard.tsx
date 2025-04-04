import React from 'react';
import './JobsCard.css';

interface JobCardProps {
  jobId: number;
  title: string;
  description: string;
  pay: string;
  status: string;
  isBookmarked?: boolean; // Bookmark status
  onBookmarkToggle?: () => void; // Bookmark toggle handler
}

const JobsCard: React.FC<JobCardProps> = ({
  title,
  description,
  pay,
  status,
}) => {
  return (
    <div className="job-card">
      <div className="job-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="job-details">
          <p><span>Starting Salary:</span> {pay}</p>
          <p><span>Status:</span> {status}</p>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
