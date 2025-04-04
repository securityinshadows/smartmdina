import React from 'react';
import '../Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar: React.FC = () => {
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
          <Link to="/admin">
            <button className="home-button"> Main Dashboard </button>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/admin/studio">
             Contributor Operations
          </Link>
          <button className="icon-button register" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
