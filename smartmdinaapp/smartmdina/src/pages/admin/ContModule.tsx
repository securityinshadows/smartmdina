import React, { useState, useEffect } from 'react';
import './css/ContModule.css';
import ContCarousel from '../../components/users/ContCarousel';
import ContributorTable from '../../components/users/ContTable';
import AdminNavbar from '../../components/users/AdminNavbar';
import PopupForm from '../../components/users/AdminPopup';

const categories = ['educational-services', 'jobs', 'tourism', 'news'];

const fieldMap: { [key: string]: string[] } = {
  news: ['date', 'image', 'status', 'tags', 'title', 'body', 'description'],
  'educational-services': ['address', 'image', 'tags', 'title', 'type', 'body', 'description'],
  jobs: ['pay', 'description', 'status', 'tags', 'title'],
  tourism: ['address', 'image', 'tags', 'title', 'type', 'body', 'description'],
};

// Define DataItem type
type DataItem = {
  [key: string]: string | number | boolean | undefined; // We allow boolean here for flexibility
};

const ContributorModule: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);
  const [newData, setNewData] = useState<DataItem>({});
  const [data, setData] = useState<DataItem[]>([]); // State to hold data for the active category

  // Function to convert DataItem to { [key: string]: string }
  const getStringOnlyData = (data: DataItem): { [key: string]: string } => {
    const stringData: { [key: string]: string } = {};
    Object.keys(data).forEach((key) => {
      stringData[key] = String(data[key] ?? ''); // Convert everything to a string
    });
    return stringData;
  };

  // Fetch data based on the active category
  useEffect(() => {
    // Replace this with actual API call if necessary
    fetch(`http://localhost:8080/api/${activeCategory.replace(/[-\s]/g, '')}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result); // Update state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [activeCategory]); // Re-fetch data when the active category changes

  const handleAddClick = () => {
    setNewData({});
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleEditClick = (data: DataItem) => {
    setNewData(data);
    setIsPopupVisible(true);
  };

  const handleFormSubmit = (data: DataItem) => {
    fetch(`http://localhost:8080/api/${activeCategory.replace(/[-\s]/g, '')}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('Data submitted successfully:', result);
        setIsPopupVisible(false);
      })
      .catch((error) => {
        console.error('Error submitting data:', error);
      });
  };

  return (
    <div className="contributor-page">
      <AdminNavbar />
      <ContCarousel
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <div className="carousel-container">
        {categories.map((category) => (
          <div
            key={category}
            className={`carousel-item ${activeCategory === category ? 'active' : ''}`}
          >
            <ContributorTable
              category={activeCategory}
              data={data} // Passing data to ContributorTable
              onEdit={handleEditClick}
            />
          </div>
        ))}
      </div>

      <button className="btn-add" onClick={handleAddClick}>
        Add New Information
      </button>

      {isPopupVisible && (
        <PopupForm
          isOpen={isPopupVisible}
          onClose={handleClosePopup}
          onSubmit={handleFormSubmit}
          fields={fieldMap[activeCategory]}
          initialData={getStringOnlyData(newData)} // Convert data to strings for submission
        />
      )}
    </div>
  );
};

export default ContributorModule;