import React from 'react';
import './JobsCard.css'; 

interface ApplicationCardProps {
  applicationId: number;
  title: string;
  description: string;
  salary: string;
  status: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
//   applicationId,
  title,
  description,
  salary,
  status,
  isBookmarked = false,
  onBookmarkToggle,
}) => {
  return (
    <div className="job-card"> 
      <div className="job-image">
        <img src="./pages/casatram.jpg" alt="Job" />
      </div>
      <div className="job-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="job-details">
          <p>
            <span>Starting Salary:</span> {salary}
          </p>
          <p>
            <span>Status:</span> {status}
          </p>
        </div>
      </div>
      <button className="bookmark-button" onClick={onBookmarkToggle}>
        {isBookmarked ? 'Unbookmark' : 'Bookmark'}
      </button>
    </div>
  );
};

export default ApplicationCard;
