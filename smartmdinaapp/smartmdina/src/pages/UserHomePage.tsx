import React, { useState } from 'react';
import Card from '../components/Card';
import MapComponent from '../components/MapComponent';
import SearchBar from '../components/SearchBar';
import UserNavbar from '../components/users/UserNavbar';
import WelcomeText from '../components/WelcomeText';
import './UserHomePage.css';

const UserHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cards = [
    { title: 'Latest News', description: 'Stay updated with the latest trends.', imageUrl: 'https://assets.new.siemens.com/siemens/assets/api/uuid:d85abd99-d3b2-440c-b2ae-ff727cd48295/width:1024/IM2021080602MO.jpg', extraInfo: 'January 13, 2025' },
    { title: 'Smart Transportation', description: 'Casablanca at night', imageUrl: 'https://1.bp.blogspot.com/-tDhqBIZn6H0/XwB57BrllyI/AAAAAAAAFec/YBoz4G2rVIcstdPqJhoZ7iD5UPfninVPQCLcBGAsYHQ/s2048/Downtown%252C_Casablanca.jpg', extraInfo: 'today bruh' },
  ];

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <UserNavbar />
      <div className="content">
        <WelcomeText />
        <MapComponent />
        <SearchBar 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update the search query on change
        />
        <div className="cards-container">
          {filteredCards.length > 0 ? (
            filteredCards.map((card, index) => (
              <Card key={index} {...card} />
            ))
          ) : (
            <p>No cards found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
