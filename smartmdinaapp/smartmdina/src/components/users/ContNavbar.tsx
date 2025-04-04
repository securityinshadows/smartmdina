import React from 'react';
import '../Navbar.css';
import { useNavigate } from 'react-router-dom';

const ContNavbar: React.FC = () => {
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
         
         
        </div>
        <div className="navbar-links">
          <button className="icon-button register" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default ContNavbar;
