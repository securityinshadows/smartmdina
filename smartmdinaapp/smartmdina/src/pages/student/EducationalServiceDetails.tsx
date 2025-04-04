import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/StudentModule.css';
import UserNavbar from '../../components/users/UserNavbar';

interface EducationalServiceDetail {
  service_id: string;
  title: string;
  description: string;
  image: string;
  rating: number;
  address: string;
  body: string;
}

const EducationalServiceDetails: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<EducationalServiceDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/educationalservices/${serviceId}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.error('Error fetching service data:', error);
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
    return <div>Service not found</div>;
  }

  return (
    <div className="service-details-page">
        <UserNavbar />
      <h1>{service.title}</h1>
      <img src={service.image} alt={service.title} />
      <p>{service.description}</p>
      <p><strong>Address:</strong> {service.address}</p>
      <p><strong>Rating:</strong> {service.rating}</p>
      <div className="service-body">
        <p>{service.body}</p>
      </div>
    </div>
  );
};

export default EducationalServiceDetails;
