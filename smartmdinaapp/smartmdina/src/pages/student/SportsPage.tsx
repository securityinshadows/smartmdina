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

const SportsPage: React.FC = () => {
  const [sports, setSports] = useState<EducationalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/educationalservices?type=sport')
      .then((response) => {
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setSports(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
          setSports([]); // Set empty array if the data is not in the expected format
        }
      })
      .catch((error) => {
        console.error('Error fetching sport data:', error);
        setSports([]); // If there's an error, set empty array
      })
      .finally(() => {
        setLoading(false); // Always set loading to false after fetching data
      });
  }, []);

  const handleRatingChange = (serviceId: string, newRating: number) => {
    axios
      .post(`http://localhost:8080/api/educationalservices/${serviceId}/ratings`, { rating: newRating })
      .then(() => {
        setSports((prevSports) =>
          prevSports.map((sport) =>
            sport.service_id === serviceId
              ? {
                  ...sport,
                  rating: newRating, // Update the rating directly in the list
                }
              : sport
          )
        );
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };

  return (
    <div className="home-page">
      <UserNavbar />
      <div className="content">
        <h1>Sports & Fitness</h1>
        <p>Discover sports facilities and fitness centers near you.</p>
        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : sports.length === 0 ? (
          <p>No sports facilities found or there was an error loading data.</p> // Handle no data case
        ) : (
          <div className="cards-container">
            {sports.map((sport) => (
                <Link
                to={`/education/${sport.service_id}`}  // Link to the details page of each service
                key={sport.service_id}
              >
              <BusinessTrendingCard
                key={sport.service_id}
                title={sport.title}
                description={sport.description}
                imageUrl={sport.image}
                rating={sport.rating}
                onRatingChange={(newRating) => handleRatingChange(sport.service_id, newRating)}
              />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SportsPage;
