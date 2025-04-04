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

const LibrariesPage: React.FC = () => {
  const [libraries, setLibraries] = useState<EducationalService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/educationalservices?type=library')
      .then((response) => {
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setLibraries(response.data);
        } else {
          console.error('Received data is not an array:', response.data);
          setLibraries([]); // If not an array, set to empty array
        }
      })
      .catch((error) => {
        console.error('Error fetching library data:', error);
        setLibraries([]); // In case of error, set empty array
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  const handleRatingChange = (serviceId: string, newRating: number) => {
    axios
      .post(`http://localhost:8080/api/educationalservices/${serviceId}/ratings`, { rating: newRating })
      .then(() => {
        setLibraries((prevLibraries) =>
          prevLibraries.map((lib) =>
            lib.service_id === serviceId
              ? {
                  ...lib,
                  rating: newRating, // Update the rating directly in the list
                }
              : lib
          )
        );
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };

  return (
    <div className="home-page">
      <UserNavbar />
      <div className="content">
        <h1>Libraries</h1>
        <p>Find libraries and coaching centers to help with your learning.</p>
        {loading ? (
          <p>Loading...</p>
        ) : libraries.length === 0 ? (
          <p>No libraries found or there was an error loading data.</p>
        ) : (
          <div className="cards-container">
            {libraries.map((library) => (
                 <Link
                 to={`/education/${library.service_id}`}  // Link to the details page of each service
                 key={library.service_id}
               >
              <BusinessTrendingCard
                key={library.service_id}
                title={library.title}
                description={library.description}
                imageUrl={library.image}
                rating={library.rating}
                onRatingChange={(newRating) => handleRatingChange(library.service_id, newRating)}
              />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrariesPage;
