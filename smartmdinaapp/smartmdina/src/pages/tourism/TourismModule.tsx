import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import Card from '../../components/Card';
import './css/TourismModule.css';
import UserNavbar from '../../components/users/UserNavbar';

interface Tourism {
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

const TourismModule: React.FC = () => {
  const [tourismData, setTourismData] = useState<Tourism[]>([]);
  const [filteredData, setFilteredData] = useState<Tourism[]>([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    console.log('Component mounted');
    // Fetch data from the API when the component mounts
    fetch('http://localhost:8080/api/tourism')
      .then((response) => {
        console.log('Response status:', response.status);
        console.log('Response content type:', response.headers.get('Content-Type'));

        // Check if the response is JSON
        if (response.ok && response.headers.get('Content-Type')?.includes('application/json')) {
          return response.json();
        } else {
          throw new Error('Invalid response: Not JSON');
        }
      })
      .then((data: Tourism[]) => {
        console.log('Fetched data:', data);  // Log fetched data to check its structure
        setTourismData(data);
        setFilteredData(data); // Initialize with all data
        console.log('Data initialized');
      })
      .catch((error) => {
        console.error('Error fetching tourism data:', error);
      });
  }, []);

  // Handle search filter
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search value changed');
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filtered = tourismData.filter((item: Tourism) =>
      item.title.toLowerCase().includes(value) ||
      item.type.toLowerCase().includes(value) ||
      (item.tags && item.tags.toLowerCase().includes(value))
    );
    setFilteredData(filtered);
    console.log('Filtered data:', filtered);
  };

  // Define categories
  const categories = ['Landmarks', 'Restaurants', 'Hotels', 'ATMs'];

  console.log('Rendering component');
  return (
    <div className="tourism-page">
      {/* Navigation Bar */}
      <UserNavbar />

      {/* Main Content */}
      <div className="content">
        <h1>Tourism Services</h1>
        <SearchBar value={searchValue} onChange={handleSearchChange} />

        {/* Category Sections */}
        {categories.map((category) => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="carousel">
              {filteredData
                .filter((item: Tourism) => item.type.toLowerCase() === category.toLowerCase())
                .map((item: Tourism) => (
                  <Card
                    key={item.serviceId}
                    title={item.title}
                    description={item.description || item.body} // Use description or body if description is empty
                    imageUrl={item.image || 'default-image.jpg'} // Default image if no image is provided
                    extraInfo={item.address}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourismModule;