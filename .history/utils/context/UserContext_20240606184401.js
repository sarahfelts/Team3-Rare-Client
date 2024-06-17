import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

// Create the context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [uid, setUid] = useState(null);

  console.warn('uid:', uid); // This will log the value of uid to the console

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
