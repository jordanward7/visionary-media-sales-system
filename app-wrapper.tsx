import React, { useState, useEffect } from 'react';
import { initializeStorage, auth, dataStore } from './utils/auth-storage-utils';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    checkAuth();
  }, []);

  const checkAuth = () => {
    const isAuth = auth.isAuthenticated();
    if (isAuth) {
      setCurrentUser(auth.getCurrentUser());
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      {!isAuthenticated ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <SalesNavigation 
          currentUser={currentUser}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
};

export default App;
