import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  extraInfo?: string; // Optional property
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, extraInfo }) => {
  return (
    <div className="card">
      <img src={imageUrl} alt="Card Image" className="card-image" />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        {extraInfo && <p className="extra-info">{extraInfo}</p>}
      </div>
    </div>
  );
};

export default Card;
