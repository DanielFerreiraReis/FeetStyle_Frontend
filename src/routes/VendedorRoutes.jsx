import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import TelaDeVendas from '../pages/private/seller/telaDeVendas.jsx';

const vendedorRoutes = [
  <Route
    key="vendedor-layout"
    path="/TelaDeVendas"
    element={
      <PrivateRoute allowedRoles={['vendedor']}>
        <TelaDeVendas />
      </PrivateRoute>
    }
  />
];

export default vendedorRoutes;