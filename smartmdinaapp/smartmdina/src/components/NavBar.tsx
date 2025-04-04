import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';

const Navbar: React.FC = () => {
 const [isPopupVisible, setIsPopupVisible] = useState(false);
 const [isRegisterOpen, setRegisterOpen] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false); // Track if user is logged in
 const [redirectPath, setRedirectPath] = useState<string | null>(null); // Track where to redirect after login

 const navigate = useNavigate(); // Use navigate for redirection

 const handleLoginClick = () => {
 setIsPopupVisible(true); // Show the login popup
 };

 const handleClosePopup = () => {
 setIsPopupVisible(false); // Close the login popup
 };

 const handleRegisterClick = () => {
 setRegisterOpen(true);
 };

 const handleCloseRegister = () => {
 setRegisterOpen(false);
 };

 const handleModuleClick = (event: React.MouseEvent, moduleName: string) => {
 event.preventDefault(); // Prevent default navigation

 const path = `/user/${moduleName}`; // Dynamically create the redirect path

 if (!isLoggedIn) {
 setRedirectPath(path); // Set the target path for redirection
 setIsPopupVisible(true); // Show login popup
 } else {
 navigate(path); // Directly navigate to the path if logged in
 }
 };

 // Handle successful login
 const handleLoginSuccess = () => {
 setIsLoggedIn(true); // Set user as logged in
 if (redirectPath) {
 navigate(redirectPath); // Redirect to the intended path after login
 setRedirectPath(null); // Reset redirect path
 } else {
 navigate('/user/home'); // Otherwise, navigate to home page
 }
 setIsPopupVisible(false); // Close the login popup
 };

 return (
 <>
 <nav className="navbar">
  <div className="navbar-left">
  <a href="/" onClick={(event) => handleModuleClick(event, 'home')}>
  <button className="home-button">Home</button>
  </a>
  </div>
  <div className="navbar-links">
  <a href="/" onClick={(event) => handleModuleClick(event, 'business')}>Business</a>
  <a href="/" onClick={(event) => handleModuleClick(event, 'education')}>Education</a>
  <a href="/" onClick={(event) => handleModuleClick(event, 'employment')}>Employment</a>
  <a href="/" onClick={(event) => handleModuleClick(event, 'tourism')}>Tourism</a>
  </div>
  <div className="navbar-right">
  <button className="login-button" onClick={handleLoginClick}>
  Login
  </button>
  <button className="icon-button register" onClick={handleRegisterClick}>
  Register
  </button>
  </div>
 </nav>

 {/* Login Popup */}
 <LoginPopup 
  isVisible={isPopupVisible} 
  onClose={handleClosePopup} 
  onLoginSuccess={handleLoginSuccess} 
 />
 <RegisterPopup isOpen={isRegisterOpen} onClose={handleCloseRegister} />
 </>
 );
};

export default Navbar;
