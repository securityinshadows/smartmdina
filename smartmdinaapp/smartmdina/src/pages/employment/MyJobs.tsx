import React, { useEffect, useState } from 'react';
import axios from '../../utils/axiosInstance'; // Assume axios is configured
import JobsCard from '../../components/JobsCard';
import Navbar from '../../components/NavBar';
import SideNav from '../../components/SideNav';
import './css/JobsModule.css';

interface Job {
  jobId: number;
  title: string; 
  description: string;
  pay: string;
  status: string;
  isBookmarked?: boolean;
}

const MyJobsPage: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs'); // Backend endpoint for user-created jobs
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleBookmarkToggle = (jobId: number) => {
    // Placeholder function for future bookmark logic
    setJobs(prevJobs =>
      prevJobs.map(job =>
        job.jobId === jobId ? { ...job, isBookmarked: !job.isBookmarked } : job
      )
    );
  };

  return (
    <div className="jobs-module">
      <Navbar />

      <div className="main-content">
        <SideNav />

       <div className="content">
          <h1>My Jobs</h1>
          <div className="job-listings">
            {jobs.map(job => (
              <JobsCard
                key={job.jobId}
                {...job}
                onBookmarkToggle={() => handleBookmarkToggle(job.jobId)} 
              />
            ))}
          </div> 
        </div>
      </div>
     </div>
  );
};

export default MyJobsPage;
