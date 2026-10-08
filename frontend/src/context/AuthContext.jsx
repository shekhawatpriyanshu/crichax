import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('crichax_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(true);
  const [backendStatus, setBackendStatus] = useState({ online: null, message: 'Checking backend...' });

  // Test backend connectivity and fetch current user profile
  const initAuth = useCallback(async () => {
    setIsLoading(true);
    // Check backend health
    try {
      const health = await authService.checkBackendHealth();
      setBackendStatus({ online: true, message: health.message || 'Backend Connected' });
    } catch (err) {
      setBackendStatus({ online: false, message: 'Backend unreachable. Ensure backend is running on port 3000.' });
    }

    // Try fetching /auth/me with cookies or bearer token
    try {
      const currentUser = await authService.getMe();
      setUser(currentUser);
    } catch {
      // If token expired or guest, reset stored user
      setUser(null);
      localStorage.removeItem('crichax_user');
      localStorage.removeItem('crichax_access_token');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    setUser(data.user);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        backendStatus,
        login,
        register,
        logout,
        checkHealth: initAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
