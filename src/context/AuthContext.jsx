import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null); // ✅ NOVO: armazenar o ID do funcionário logado
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

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
          setUserId(decoded.user_id); // ✅ ALTERADO: antes era decoded.id, agora usamos decoded.user_id (igual ao payload do JWT)
        }
      } catch {
        logout();
      }
    }
  }, [token]);

  const login = (role, receivedToken) => {
    setIsAuthenticated(true);
    setUserRole(role);

    const decoded = jwtDecode(receivedToken);
    setUserId(decoded.user_id); // ✅ ALTERADO: armazenar o ID do funcionário ao logar

    setToken(receivedToken);
    sessionStorage.setItem('token', receivedToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null); // ✅ ALTERADO: limpar também o ID ao deslogar
    setToken(null);
    sessionStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);