import React, { useState } from 'react';
import './BusinessTrendingCard.css';

interface BusinessTrendingCardProps {
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  onRatingChange: (newRating: number) => void;
}

const BusinessTrendingCard: React.FC<BusinessTrendingCardProps> = ({
  title,
  description,
  imageUrl,
  rating,
  onRatingChange,
}) => {
  const [userRating, setUserRating] = useState<number | null>(null);

  const renderStars = (currentRating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i < currentRating ? 'filled' : ''}`}
          onClick={() => handleStarClick(i + 1)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  const handleStarClick = (newRating: number) => {
    setUserRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <div className="business-trending-card">
      <img src={imageUrl} alt={`Can't load image`} className="business-image" />
      <div className="business-info">
        <h3 className="business-title">{title}</h3>
        <p className="business-description">{description}</p>
        <div className="business-rating">
          {renderStars(userRating !== null ? userRating : rating)}
        </div>
      </div>
    </div>
  );
};

export default BusinessTrendingCard;
