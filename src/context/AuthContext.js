import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated (from storage)
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // In a real app, check AsyncStorage or secure storage
      // For now, we'll simulate this
      setLoading(false);
    } catch (error) {
      console.error('Auth check failed:', error);
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      // Direct login based on phone number only
      
      // Check user type based on phone number
      const isAdmin = credentials.phone === '9';
      const isMerchant = credentials.phone === '8';
      
      const userData = isAdmin ? {
        id: 1,
        name: 'Admin User',
        phone: credentials.phone,
        role: 'admin'
      } : isMerchant ? {
        id: 2,
        name: 'John Doe',
        phone: credentials.phone,
        businessName: 'Cozy Hostel',
        role: 'merchant'
      } : {
        id: 3,
        name: 'Regular User',
        phone: credentials.phone,
        role: 'user'
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      
      // In a real app, store auth token in secure storage
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      // In a real app, make API call to logout and clear storage
      setUser(null);
      setIsAuthenticated(false);
      return { success: true };
    } catch (error) {
      console.error('Logout failed:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // In a real app, make API call to create account
      // For now, we'll simulate successful signup
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        businessName: userData.businessName,
        role: 'merchant'
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Signup failed:', error);
      return { success: false, error: error.message };
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};