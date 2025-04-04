// MyApplications.tsx
import React, { useState, useEffect } from 'react';
import axios from '../../utils/axiosInstance'; // Assume axios is configured
import SideNav from '../../components/SideNav';
import ApplicationCard from '../../components/ApplicationCard'; // Import the updated ApplicationCard
import Navbar from '../../components/NavBar';
import SearchBar from '../../components/SearchBar';
import './css/MyApplications.css';

interface Application {
  applicationId: number;
  title: string;
  description: string;
  salary: string;
  status: string;
}

const MyApplicationsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get('/applications'); // Replace with your backend endpoint
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter(
    application =>
      application.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      application.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="my-applications">
      <Navbar />
      <div className="main-content">
        <SideNav />

        <div className="content">
          <h2>My Applications</h2>
          <SearchBar value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />

          <div className="application-list">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(application => (
                <ApplicationCard
                  key={application.applicationId}
                  applicationId={application.applicationId}
                  title={application.title}
                  description={application.description}
                  salary={application.salary}
                  status={application.status}
                />
              ))
            ) : (
              <p>No applications found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyApplicationsPage;
