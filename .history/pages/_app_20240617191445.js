import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from '../utils/context/authContext';
import PropTypes from 'prop-types';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import UserContext from '../utils/context/UserContext';
import EventPage from './event';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <AuthProvider>
      <UserContext.Provider value={{ user, login, logout }}>
        {isMounted && (
          <Router>
            <Routes>
              <Route path="/event" element={<EventPage />} />
              {/* Add more routes as needed */}
            </Routes>
            <ViewDirectorBasedOnUserAuthStatus
              // if status is pending === loading
              // if status is logged in === view app
              // if status is logged out === sign in page
              component={Component}
              pageProps={pageProps}
            />
          </Router>
        )}
      </UserContext.Provider>
    </AuthProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object,
};
export default MyApp;
