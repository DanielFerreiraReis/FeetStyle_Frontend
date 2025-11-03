import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import TelaDeVendas from '../pages/private/seller/telaDeVendas.jsx';

const VendedorRoutes = () => (
    <Route
      key="vendedor-layout"
      path="/TelaDeVendas"
      element={
        <PrivateRoute allowedRoules = {['vendedor']}>
          <TelaDeVendas/>
        </PrivateRoute>
      }
    />
);

export default VendedorRoutes;