import { BrowserRouter, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminRoutes from './routes/AdminRoutes';
import VendedorRoutes from './routes/VendedorRoutes';
import publicRoutes from './routes/PublicRoutes';
import './index.css';

function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        {publicRoutes}

        {/* Rotas privadas */}
        {isAuthenticated && userRole === 'admin' && AdminRoutes}
        {isAuthenticated && userRole === 'vendedor' && VendedorRoutes}
      </Routes>
    </BrowserRouter>
  );
}

export default App;