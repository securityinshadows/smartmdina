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

const StudentDealsPage: React.FC = () => {
  const [deals, setDeals] = useState<EducationalService[]>([]);
  const [loading, setLoading] = useState(true);  // Loading state

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/educationalservices?type=deal')
      .then((response) => {
        // Check if the response is an array
        if (Array.isArray(response.data)) {
          setDeals(response.data); // Update state with the fetched deals
        } else {
          console.error('Received data is not an array:', response.data);
          setDeals([]);  // Set empty array if the data is not in the expected format
        }
      })
      .catch((error) => {
        console.error('Error fetching deal data:', error);
        setDeals([]);  // If there's an error, set empty array
      })
      .finally(() => {
        setLoading(false);  // Set loading to false after the request completes
      });
  }, []);

  const handleRatingChange = (serviceId: string, newRating: number) => {
    axios
      .post(`http://localhost:8080/api/educationalservices/${serviceId}/ratings`, { rating: newRating })
      .then(() => {
        setDeals((prevDeals) =>
          prevDeals.map((deal) =>
            deal.service_id === serviceId
              ? {
                  ...deal,
                  rating: newRating, // Update the rating directly in the list
                }
              : deal
          )
        );
      })
      .catch((error) => console.error('Error submitting rating:', error));
  };

  return (
    <div className="home-page">
      <UserNavbar />
      <div className="content">
        <h1>Student Deals</h1>
        <p>Check out the latest student discounts and offers.</p>
        
        {/* Show loading message if data is being fetched */}
        {loading ? (
          <p>Loading...</p>
        ) : deals.length === 0 ? (
          <p>No student deals found or there was an error loading data.</p> // Show error message if no data
        ) : (
          <div className="cards-container">
            {deals.map((deal) => (
                <Link
                to={`/education/${deal.service_id}`}  // Link to the details page of each service
                key={deal.service_id}
              >
              <BusinessTrendingCard
                key={deal.service_id}
                title={deal.title}
                description={deal.description}
                imageUrl={deal.image}
                rating={deal.rating}
                onRatingChange={(newRating) => handleRatingChange(deal.service_id, newRating)}
              />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDealsPage;
