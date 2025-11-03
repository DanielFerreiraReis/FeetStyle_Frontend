import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, allowedRoles }) {
  const { isAuthenticated, userRole } = useAuth();

// Se o usuário não estiver logado redireciona para Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
// Se a rota exige papéis específicos e o usuário não tem nenhum deles → redireciona pra home
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }
// Caso contrário, libera o acesso
  return <>{children}</>;
}

export default PrivateRoute;