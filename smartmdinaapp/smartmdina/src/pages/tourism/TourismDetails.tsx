import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/TourismModule.css';
import UserNavbar from '../../components/users/UserNavbar';

interface TourismDetail {
  serviceId: number;
  title: string;
  type: string;
  image?: string | null;
  description: string;
  address: string;
  tags?: string | null;
  rating?: number;
  createdAt?: string | null;
  updatedAt?: string | null;
  body: string;
}

const TourismDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<TourismDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data for the specific service based on the serviceId from URL
    axios
      .get(`http://localhost:8080/api/tourism/${serviceId}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tourism service data:', error);
        setService(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Tourism service not found</div>;
  }

  return (
    <div className="tourism-detail-page">
    <UserNavbar />
      <h1>{service.title}</h1>
      <img src={service.image || 'default-image.jpg'} alt={service.title} />
      <p>{service.description || service.body}</p>
      <p><strong>Address:</strong> {service.address}</p>
      <p><strong>Rating:</strong> {service.rating ?? 'Not rated'}</p>
      <div className="service-body">
        <p>{service.body}</p>
      </div>
    </div>
  );
};

export default TourismDetails;
