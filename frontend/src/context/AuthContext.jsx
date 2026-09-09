// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../api/auth.api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getCurrentUser();
        if (data?.student) {
          setUser(data.student);
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        setUser(null);
      } finally {
        setLoading(false); 
      }
    }

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};