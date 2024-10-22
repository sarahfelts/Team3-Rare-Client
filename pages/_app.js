/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';
import { Routes, Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector';
import UserContext from '../utils/context/UserContext';
import Home from './index';
import EditUser from './users/edit/[id]';

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
              <Route path="/" element={<Home />} />
              <Route path="/users/edit/:id" element={<EditUser />} />
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
export default MyApp;
