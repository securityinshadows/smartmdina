import React from 'react';

type ContCarouselProps = {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

const ContCarousel: React.FC<ContCarouselProps> = ({ categories, activeCategory, onCategoryChange }) => {
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-controls">
        {categories.map((category) => (
          <button
            key={category}
            className={`carousel-button ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContCarousel;
