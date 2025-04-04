import React, { useState } from 'react';
import { useUser } from '../UserContext';
import './Popup.css';

interface LoginPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void; // Add this prop to the interface
}

const LoginPopup: React.FC<LoginPopupProps> = ({ isVisible, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setRole, setUserId } = useUser(); // Access setRole and setUserId from UserContext

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const credentials = { username, password };

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token, user } = data;

      // Set JWT token and user info in localStorage
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.userId.toString());

      // Update the context with role and userId
      setRole(user.role);
      setUserId(user.userId.toString());

      // Call onLoginSuccess after a successful login
      onLoginSuccess(); // <-- Call the function passed via props

      // Navigate based on the role
      if (user.role === 'admin') {
        window.location.replace('/admin');
      } else if (user.role === 'user') {
        window.location.replace('/user/home');
      } else {
        alert('Role not recognized');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('Login failed. Please check your username and password.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
