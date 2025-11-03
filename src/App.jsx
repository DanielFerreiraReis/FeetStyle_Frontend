import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminRoutes from './routes/AdminRoutes';
import VendedorRoutes from './routes/VendedorRoutes';
import Login from './pages/public/Login';
import Home from './pages/public/Home';
import './index.css'
import publicRoutes from './routes/PublicRoutes';

function App() {
  const { isAuthenticated, userRole } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas para acessso geral*/}
        {publicRoutes}

        {/* Rotas privadas */}
        {isAuthenticated && userRole === 'admin' && <AdminRoutes />}
        {isAuthenticated && userRole === 'vendedor' && <VendedorRoutes />}
      </Routes>
    </BrowserRouter>
  );
}

export default App;