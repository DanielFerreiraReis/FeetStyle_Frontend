import { Routes } from 'react-router-dom';

import publicRoutes from './PublicRoutes';
import AdminRoutes from './AdminRoutes'


function AppRoutes() {
  return <Routes>{[...publicRoutes, ...AdminRoutes]}</Routes>;
}

export default AppRoutes;