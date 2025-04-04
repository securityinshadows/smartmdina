import React from 'react';
import '../Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const UserNavbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from localStorage
    localStorage.removeItem('token');

    // Redirect the user to the login page
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/user/home">
            <button className="home-button">Home</button>
          </Link>
        </div>
        <div className="navbar-links">
          
            <a href="/user/business">Business </a>
        
          <a href="/user/education">Education</a>
          <a href="/user/employment">Employment</a>
          <a href="/user/tourism">Tourism</a>
          <button className="icon-button register" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
