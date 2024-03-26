
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  // Initialize userType from sessionStorage or default to 'default'
  const [userType, setUserType] = useState(() => {
    const savedUserType = sessionStorage.getItem('userType');
    return savedUserType || 'default';
  });

  // Update sessionStorage when userType changes
  useEffect(() => {
    sessionStorage.setItem('userType', userType);
  }, [userType]);

  return (
    <UserContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserContext.Provider>
  );
};
