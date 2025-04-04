import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface UserContextType {
  role: string | null;
  userId: string | null;
  setRole: (role: string | null) => void;
  setUserId: (userId: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Load the role and userId from localStorage on page load
    const storedRole = localStorage.getItem('userRole');
    const storedUserId = localStorage.getItem('userId');
    
    if (storedRole) setRole(storedRole);
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <UserContext.Provider value={{ role, userId, setRole, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
