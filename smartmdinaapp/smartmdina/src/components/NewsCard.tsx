import React from 'react';
import './NewsCard.css';

interface NewsCardProps {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, imageUrl, date }) => {
  return (
    <div className="news-card">
      <img src={imageUrl} alt="News" className="news-card-image" />
      <div className="news-card-content">
        <h2>{title}</h2>
        <p className="date">{date}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default NewsCard;

