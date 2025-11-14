import { Outlet, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from '../pages/private/admin/DashboardLayout'; // layout com sidebar
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
        <DashboardLayout />
      </PrivateRoute>
    }
  >
    {/* Página inicial do dashboard */}
    <Route index element={<h1> OLÀ</h1>} />

    {/* Fluxo de cadastro de funcionário */}
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
