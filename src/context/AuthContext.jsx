import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../lib/database';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.init();
    const savedUser = localStorage.getItem('temio_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const foundUser = db.getUserByEmail(email);
    
    if (!foundUser) {
      return { success: false, error: 'Usuario no encontrado' };
    }
    
    if (foundUser.password !== password) {
      return { success: false, error: 'Contraseña incorrecta' };
    }

    setUser(foundUser);
    localStorage.setItem('temio_current_user', JSON.stringify(foundUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('temio_current_user');
  };

  const updateProfile = (updates) => {
    if (!user) return null;
    const updatedUser = db.updateUserProfile(user.id, updates);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('temio_current_user', JSON.stringify(updatedUser));
    }
    return updatedUser;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
