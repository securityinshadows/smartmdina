import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BusinessTrendingCard from '../../components/BusinessTrendingCard';
import './css/StudentModule.css';
import { Link } from 'react-router-dom';
import UserNavbar from '../../components/users/UserNavbar';

interface EducationalService {
  service_id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  type: string;
}

const SchoolsPage: React.FC = () => {
  const [schools, setSchools] = useState<EducationalService[]>([]); // Ensure it's an empty array initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/educationalservices?type=school')
      .then((response) => {
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setSchools(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
          setSchools([]); // If the data is not an array, set an empty array
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching school data:', error);
        setLoading(false);
      });
  }, []);

  const handleRatingChange = (serviceId: string, newRating: number) => {
    axios
      .post(`http://localhost:8080/api/educationalservices/${serviceId}/ratings`, { rating: newRating })
      .then(() => {
        setSchools((prevSchools) =>
          prevSchools.map((school) =>
            school.service_id === serviceId
              ? {
                  ...school,
                  rating: newRating, // Update the rating directly in the list
                }
              : school
          )
        );
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };

  return (
    <div className="home-page">
      <UserNavbar />
      <div className="content">
        <h1>Schools & Universities</h1>
        <p>Explore educational institutions for your studies.</p>
        {loading ? (
          <p>Loading...</p>
        ) : schools.length === 0 ? (
          <p>No schools found</p>
        ) : (
          <div className="cards-container">
            {schools.map((school) => (
                <Link
                to={`/education/${school.service_id}`}  // Link to the details page of each service
                key={school.service_id}
              >
              <BusinessTrendingCard
                key={school.service_id}
                title={school.title}
                description={school.description}
                imageUrl={school.image}
                rating={school.rating}
                onRatingChange={(newRating) => handleRatingChange(school.service_id, newRating)}
              />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SchoolsPage;
