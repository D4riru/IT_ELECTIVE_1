'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on initial load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Function to get all registered users from localStorage
  const getRegisteredUsers = () => {
    if (typeof window === 'undefined') return [];
    const users = localStorage.getItem('registeredUsers');
    return users ? JSON.parse(users) : [];
  };

  // Function to save a new user to registered users
  const saveRegisteredUser = (userData) => {
    const existingUsers = getRegisteredUsers();
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const registeredUsers = getRegisteredUsers();
        const foundUser = registeredUsers.find(
          user => user.email === email && user.password === password
        );

        if (foundUser) {
          // Remove password from user data before storing as current user
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const registeredUsers = getRegisteredUsers();
        
        // Check if user already exists
        const userExists = registeredUsers.some(user => user.email === email);
        if (userExists) {
          reject(new Error('User with this email already exists'));
          return;
        }

        const userData = {
          id: Date.now(),
          name: name,
          email: email,
          password: password, // Store password for login validation
          createdAt: new Date().toISOString()
        };

        // Save to registered users
        saveRegisteredUser(userData);

        // Also log the user in immediately after registration
        const { password: _, ...userWithoutPassword } = userData;
        setUser(userWithoutPassword);
        localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
        
        resolve(userWithoutPassword);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      loading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}