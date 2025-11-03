import { Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';


const adminRoutes = [
  <Route
    key="admin-layout"
    path="/dashboard"
    element={
      <PrivateRoute allowedRoles={['admin']}>
        {/* <Dashboard /> */}
        
      </PrivateRoute>
    }
  >
  </Route>,
];

export default adminRoutes;