import { Outlet, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/private/admin/Dashboard';
import Cadastro from '../pages/private/admin/Cadastro';
import DadosPessoaisFuncionario from '../pages/private/admin/cadastrosFuncionario/DadosPessoaisFuncionario';
import Endereco from '../pages/private/admin/utilsCadastro/Endereco';
import { FormProvider } from '../context/FormContext';

const funcionarioSteps = [
  { path: 'dados-pessoais', label: 'Dados Pessoais' },
  { path: 'endereco', label: 'Endereço' },
];

const adminRoutes = [
  <Route
    key="admin"
    path="/dashboard"
    element={
      <PrivateRoute allowedRoles={['admin']}>
        <Outlet /> 
      </PrivateRoute>
    }
  >
    {/* Rota padrão do dashboard */}
    <Route index element={<Dashboard />} />

    {/* Cadastro de funcionário */}
    <Route
      path="cadastro"
      element={
        <FormProvider>
          <Outlet />
        </FormProvider>
      }
    >
      <Route
        path="funcionario"
        element={<Cadastro steps={funcionarioSteps} />}
      >
        <Route path="dados-pessoais" element={<DadosPessoaisFuncionario />} />
        <Route path="endereco" element={<Endereco />} />
      </Route>
    </Route>
  </Route>,
];

export default adminRoutes;
