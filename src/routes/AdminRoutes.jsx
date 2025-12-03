import { Outlet, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../pages/private/admin/DashboardLayout";
import Cadastro from "../pages/private/admin/Cadastro";
import DadosPessoaisFuncionario from "../pages/private/admin/cadastrosFuncionario/DadosPessoaisFuncionario";
import Endereco from "../pages/private/admin/utilsCadastro/Endereco";
import { FormProvider } from "../context/FormContext";
import CadastroCalcado from "../pages/private/admin/cadastrosProduto/CadastroCalcado";

const funcionarioSteps = [
  { path: "dados-pessoais", label: "Dados Pessoais" },
  { path: "endereco", label: "Endereço" },
];

const adminRoutes = [
  <Route
    key="admin"
    path="/dashboard"
    element={
      <PrivateRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </PrivateRoute>
    }
  >
    {/* Página inicial do dashboard */}
    <Route index element={<h1>OLÀ</h1>} />

    {/* Cadastro de calçados sem steps */}
    <Route
      key="calcados"
      path="calcados"
      element={
        <FormProvider>
          <CadastroCalcado />
        </FormProvider>
      }
    />

    {/* Fluxo de cadastro */}
    <Route
      path="cadastro"
      element={
        <FormProvider>
          <Outlet />
        </FormProvider>
      }
    >
      {/* Cadastro de funcionário com steps */}
      <Route path="funcionario" element={<Cadastro steps={funcionarioSteps} />}>
        <Route path="dados-pessoais" element={<DadosPessoaisFuncionario />} />
        <Route path="endereco" element={<Endereco />} />
      </Route>
    </Route>
  </Route>,
];

export default adminRoutes;
