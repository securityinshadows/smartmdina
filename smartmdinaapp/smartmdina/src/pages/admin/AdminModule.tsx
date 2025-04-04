import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import './css/AdminModule.css';
import ContMaker from '../../components/ContributorMaker'; // Import ContMaker
import AdminNavbar from '../../components/users/AdminNavbar';

// Define the Role interface
interface Role {
    roleId: number;
    roleName: string;
    category?: string;
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

const AdminModule: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  
    // Fetch users from API
    useEffect(() => {
      fetch('http://localhost:8080/api/users/allusers')
        .then((response) => response.json())
        .then((data) => setUsers(data))
        .catch((error) => console.error('Error fetching users:', error));
    }, []);
  
    // Filter users by search query
    const filteredUsers = users.filter(
      (user) => user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const handleRemoveUser = (id: number) => {
      fetch(`http://localhost:8080/api/users/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          alert(`User with ID ${id} removed`);
          setUsers(users.filter((user) => user.userId !== id)); // Update users list
        })
        .catch((error) => console.error('Error removing user:', error));
    };
  
    const handleCreateContributor = () => {
      setIsPopupOpen(true); // Open the popup to create a contributor
    };
  
    const handleUserCreated = (newUser: User) => {
        // Assuming the creator role ID is 1 for admin
        const creatorRoleId = 1;  // Admin role
        fetch('http://localhost:8080/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...newUser,
                creatorRoleId: creatorRoleId, // Pass the creator role ID
            }),
        })
        .then((response) => response.json())
        .then((data) => {
            setUsers([...users, data]); // Add the newly created user to the list
        })
        .catch((error) => console.error('Error creating user:', error));
    };
    
  
    return (
      <div className="admin-page">
        <AdminNavbar />
        <div className="content">
          <h1>Admin Dashboard</h1>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleCreateContributor} className="btn-create-user">
            Create User
          </button>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.userId}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.role ? user.role.roleName : 'Unknown Role'}</td>
                      <td>
                        <button
                          onClick={() => handleRemoveUser(user.userId)}
                          className="btn-remove"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
  
        {/* The ContMaker popup */}
        <ContMaker
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          onUserCreated={handleUserCreated}  // Pass callback to handle the created user
        />
      </div>
    );
  };
  

export default AdminModule;

