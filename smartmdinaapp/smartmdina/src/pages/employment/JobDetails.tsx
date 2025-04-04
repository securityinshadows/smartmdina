import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Hook to get the jobId from the URL
import './css/JobsModule.css';
import ApplyToJob from '../../components/ApplyToJob';
import UserNavbar from '../../components/users/UserNavbar';
import SideNav from '../../components/SideNav';

const JobDetails: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>(); // Get jobId from the URL parameters
  const [job, setJob] = useState<{
    title: string;
    description: string;
    pay: string;
    status: string;
  } | null>(null); // State to store job details
  const [isApplyOpen, setApplyOpen] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state to handle asynchronous data fetch

  useEffect(() => {
    // Fetch job details from the backend when the component is mounted
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/jobs/${jobId}`);
        if (response.ok) {
          const data = await response.json();
          setJob(data); // Set job data in the state
        } else {
          console.error('Job not found');
          setJob(null); // Set job to null if not found
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
        setJob(null);
      } finally {
        setLoading(false); // Set loading to false once the request completes
      }
    };

    fetchJobDetails();
  }, [jobId]); // Dependency array ensures the hook runs when jobId changes

  const handleApplyOpen = () => {
    setApplyOpen(true);
  };

  const handleApplyClose = () => {
    setApplyOpen(false);
  };

  if (loading) {
    return <div>Loading job details...</div>; // Show loading message
  }

  if (!job) {
    return <div>Job not found</div>; // Handle case where the job is not found
  }

  // Convert jobId to number before passing it to ApplyToJob
  const jobIdAsNumber = jobId ? parseInt(jobId) : NaN; // Make sure it's a number

  return (
    <div className="jobs-module">
        <UserNavbar/>
      <div className="main-content">
        <SideNav/>
        <div className="content">
          <h2 className="job-title">{job.title}</h2>
          <p className="job-description">{job.description}</p>
          <div className="job-details-info">
            <p><strong>Starting Salary:</strong> {job.pay}</p>
            <p><strong>Status:</strong> {job.status}</p>
          </div>
          <button className="apply-button" onClick={handleApplyOpen}>Apply</button>
        </div>
      </div>
      <ApplyToJob isOpen={isApplyOpen} onClose={handleApplyClose} jobId={jobIdAsNumber} />
    </div>
  );
};

export default JobDetails;
