import { Route } from 'react-router-dom';
import Home from '../pages/public/Home';
import Login from '../pages/public/Login';
import Unauthorized from '../pages/public/Unauthorized';

const publicRoutes = [
  <Route key="home" index element={<Home />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="unauthorized" path='/unauthorized' element={<Unauthorized/>}/>
];

export default publicRoutes;