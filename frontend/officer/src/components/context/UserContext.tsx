// src/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the type for the user data object received from the API
interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  phoneNumber: string;
  nicNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  roleId: string;
  departmentId: string | null;
  userTypeId: string;
  // Add any other fields your API might return that you plan to use
}

// Define the shape of the context's value
interface UserContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  userData: User | null; // userData can be User object or null
}

// Create the context with an initial undefined value that matches UserContextType
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null); // State for full user data

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) {
        setUserData(null); // Clear user data if no userId
        return;
      }

      try {
        const response = await fetch(`http://localhost:5102/api/User/${userId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json(); // Type assertion for fetched data
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data for context:', error);
        setUserData(null); // Set to null on error
      }
    };

    fetchUserData();
  }, [userId]); // Re-run effect when userId changes

  return (
    <UserContext.Provider value={{ userId, setUserId, userData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};