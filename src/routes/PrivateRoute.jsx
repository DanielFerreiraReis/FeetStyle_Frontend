import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userRole, token } = useAuth();

  // Se não estiver autenticado ou não tiver token válido, redireciona para login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // Se o cargo não estiver entre os permitidos, redireciona para página de acesso negado
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;