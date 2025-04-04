import React, { useState } from 'react';
import './Popup.css';

interface Role {
  roleId: number;
  roleName: string;
  category: string;
}

interface User {
  userId: number;
  username: string;
  email: string;
  password: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

interface ContributorCreatorPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onUserCreated: (newUser: User) => void;
}

const ContMaker: React.FC<ContributorCreatorPopupProps> = ({
  isOpen,
  onClose,
  onUserCreated, // Destructure the onUserCreated prop
}) => {
  // State to store form values
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [role, setRole] = useState<string>('USER'); // State to store selected role

  // Handling form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Ensure passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const contributor = {
      email,
      username,
      password,
      roleName: role, // Include the selected role
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contributor),
      });

      if (response.ok) {
        const newUser: User = await response.json(); 
        alert('Contributor created successfully!');
        onUserCreated(newUser); 
        onClose(); 
      } else {
        alert('Error: Could not create contributor');
      }
    } catch (error) {
      console.error('Error during contributor creation:', error);
      alert('Creation failed. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h2>Create User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="email"
              placeholder="example@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)} required>
              <option value="USER">User</option>
            </select>
          </label>
          <button type="submit">Create User</button>
        </form>
      </div>
    </div>
  );
};

export default ContMaker;