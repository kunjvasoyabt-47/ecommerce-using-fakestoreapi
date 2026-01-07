import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 1. FIX: Lazy Initialize 'user' (Check storage immediately, not in effect)
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // 2. FIX: Lazy Initialize 'token'
  const [token, setToken] = useState(() => {
    return localStorage.getItem('userToken') || null;
  });

  // (Removed the useEffect entirely because step 1 & 2 handle it now)

  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);

    // Update 'user' state immediately upon login
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);