import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
import TelaDeVendas from '../pages/private/seller/telaDeVendas.jsx';
import { FormProvider } from '../context/FormContext.jsx';

const vendedorRoutes = [
  <Route
    key="vendedor-layout"
    path="/TelaDeVendas"
    element={
      <PrivateRoute allowedRoles={['vendedor','admin']}>
          <FormProvider>
            <TelaDeVendas />
          </FormProvider>
      </PrivateRoute>
    }
  />
];

export default vendedorRoutes;