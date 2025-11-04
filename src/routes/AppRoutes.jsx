import { Routes } from 'react-router-dom';
import publicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes'
import vendedorRoutes from './VendedorRoutes';


function AppRoutes() {
  return <Routes>{[...publicRoutes, ...AdminRoutes, ...vendedorRoutes]}</Routes>;
}

export default AppRoutes;