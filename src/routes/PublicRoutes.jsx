import { Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';

const publicRoutes = [
  <Route key="home" index element={<Home />} />,
  <Route key="login" path="/login" element={<Login />} />,
];

export default publicRoutes;