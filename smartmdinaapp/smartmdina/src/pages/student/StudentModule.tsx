import React from 'react';
import { Link } from 'react-router-dom'; 
import Card from '../../components/Card'; 
import './css/StudentModule.css';
import UserNavbar from '../../components/users/UserNavbar';

const StudentModule: React.FC = () => {

  const categories = [
    {
      title: 'Schools & Universities',
      description: 'Explore educational institutions for your studies.',
      imageUrl: 'https://www.jenkinspeer.com/wp-content/uploads/2014/09/ed-uncw-SOE-7.jpg',
    },
    {
      title: 'Libraries',
      description: 'Find libraries and coaching centers to help with your learning.',
      imageUrl: 'https://external-preview.redd.it/_vDnByo3viBiLFZlKSQFOdH_qWD6UUPvwIJIe_JUkD0.jpg?auto=webp&s=0031faf9e0ebc3c2d89c7f39e07957c301e8cd8e',
    },
    {
      title: 'Student Deals',
      description: 'Check out the latest student discounts and offers.',
      imageUrl: 'https://i.pinimg.com/originals/c2/dc/cf/c2dccf244a33981319d2d9906b1202d0.jpg',
    },
    {
      title: 'Sports & Fitness',
      description: 'Discover sports facilities and fitness centers near you.',
      imageUrl: 'https://post.healthline.com/wp-content/uploads/2020/08/12066-Youth_Fitness_Exercise_Helps_Children_Excel_in_School_1200x628-facebook-1200x628.jpg',
    },
  ];

  return (
    <div className="home-page"> 
      <UserNavbar />

      <div className="content">
        <h1>Welcome to the Student Hub</h1>
        <p>Explore various services available to students.</p>

        <div className="cards-container">
          {categories.map((category, index) => (
            <Link key={index} to={`/education/${category.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}>
              <Card
                title={category.title}
                description={category.description}
                imageUrl={category.imageUrl}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentModule;
