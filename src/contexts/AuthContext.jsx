import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompletedProfile, setHasCompletedProfile] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Simulate checking authentication status
    const checkAuth = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For demo purposes, set user as authenticated with completed profile
        setIsAuthenticated(true);
        setHasCompletedProfile(true);
        setUser({
          name: 'John Doe',
          email: 'john.doe@example.com',
          company: 'Acme Corporation'
        });
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsAuthenticated(true);
      setUser({
        name: 'John Doe',
        email: email,
        company: 'Acme Corporation'
      });
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setHasCompletedProfile(false);
    setUser(null);
  };

  const completeProfile = (profileData) => {
    setHasCompletedProfile(true);
    setUser(prev => ({ ...prev, ...profileData }));
  };

  const value = {
    isAuthenticated,
    isLoading,
    hasCompletedProfile,
    user,
    login,
    logout,
    completeProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}