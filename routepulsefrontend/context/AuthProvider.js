"use client";

import { createContext, useContext, useState, useEffect } from 'react';
// Make sure to import your actual getUser function path here:
import { getUser } from '../lib/api'; 

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await getUser();
        if (res?.data) setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// This is the custom hook!
export const useAuth = () => useContext(AuthContext);