import { createContext, useContext, useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          logout();
        } else {
          setIsAuthenticated(true);
          setUserRole(decoded.role);
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (role, receivedToken) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setToken(receivedToken);
    localStorage.setItem('token', receivedToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);