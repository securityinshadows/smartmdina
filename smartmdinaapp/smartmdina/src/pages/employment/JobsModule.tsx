import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance';
import { Link } from 'react-router-dom'; // Import Link for navigation
import SideNav from '../../components/SideNav';
import JobsCard from '../../components/JobsCard';
import './css/JobsModule.css';
import SearchBar from '../../components/SearchBar';
import UserNavbar from '../../components/users/UserNavbar';

interface Job {
  jobId: number;
  title: string;
  description: string;
  pay: string;
  status: string;
}

const JobsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [jobListings, setJobListings] = useState<Job[]>([]);

  // Fetch jobs from the backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs');
        setJobListings(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter job listings based on search query
  const filteredJobListings = jobListings.filter(
    job =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="jobs-module">
      <UserNavbar />

      <div className="main-content">
        <SideNav />

        <div className="content">
          <h2>Job picks for you!</h2>
          <SearchBar
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />

          <div className="job-listings">
            {filteredJobListings.length > 0 ? (
              filteredJobListings.map(job => (
                <Link key={job.jobId} to={`/user/employment/${job.jobId}`}>
                  <JobsCard {...job} />
                </Link>
              ))
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobsModule;

