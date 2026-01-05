import { createContext, useContext, useState } from 'react';

// 1. Create the Context (Not exported, kept internal)
const AuthContext = createContext();

// 2. The Provider Component
export const AuthProvider = ({ children }) => {
  // Initialize state directly from localStorage so it persists on refresh
  const [token, setToken] = useState(localStorage.getItem('userToken'));

  // Call this function when user logs in
  const login = (newToken) => {
    localStorage.setItem('userToken', newToken);
    setToken(newToken);
  };

  // Call this function when user logs out
  const logout = () => {
    localStorage.removeItem('userToken');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. The Custom Hook
// We add this comment to stop the "Fast Refresh" warning. 
// It is safe because this hook creates no state of its own.
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);