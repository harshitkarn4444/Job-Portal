// UserContext.js
import React, { createContext, useState, useContext } from 'react';

// Create a context with default values
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]); // Add users state
    const [openings, setOpenings] = useState([]); // Manage thoughts state
    const [applications, setApplications] = useState([]);
    const [currentApplications, setCurrentApplications] = useState([]);

    return (
        <UserContext.Provider value={{ user, setUser, users, setUsers , openings, setOpenings , applications, setApplications , currentApplications, setCurrentApplications }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the UserContext
export const useUser = () => useContext(UserContext);
