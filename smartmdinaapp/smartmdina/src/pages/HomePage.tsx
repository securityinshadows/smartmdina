import React, { useState } from 'react';
import Navbar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import WelcomeText from '../components/WelcomeText';
import Card from '../components/Card';
import MapComponent from '../components/MapComponent';
import './HomePage.css';

const HomePage: React.FC = () => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="home-page">

      {/* Navigation Bar */}
      <Navbar />

      {/* Welcome & Search */}
      <div className="content">
        <WelcomeText />
        <MapComponent />
        <SearchBar
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)} // Update state on input change
        />

        {/* News & Trending */}
        <div className="cards-container">
          <Card
            title="Latest News"
            description="Welcome to the website."
            imageUrl="https://assets.new.siemens.com/siemens/assets/api/uuid:d85abd99-d3b2-440c-b2ae-ff727cd48295/width:1024/IM2021080602MO.jpg"
            extraInfo="Fun fact: Casablanca has four tramway lines."
          />
          <Card
            title="Smart Transportation"
            description="Navigate in the Navbar to your desired module."
            imageUrl="https://1.bp.blogspot.com/-tDhqBIZn6H0/XwB57BrllyI/AAAAAAAAFec/YBoz4G2rVIcstdPqJhoZ7iD5UPfninVPQCLcBGAsYHQ/s2048/Downtown%252C_Casablanca.jpg"
            extraInfo="Fun fact: Casablanca is the most populated city in Morocco."
          />
        </div>
      </div>
      
    </div>
  );
};

export default HomePage;
