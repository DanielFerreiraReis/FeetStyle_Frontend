import { Outlet, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../pages/private/admin/DashboardLayout";
import Cadastro from "../pages/private/admin/Cadastro";
import DadosPessoaisFuncionario from "../pages/private/admin/cadastrosFuncionario/DadosPessoaisFuncionario";
import Endereco from "../pages/private/admin/utilsCadastro/Endereco";
import { FormProvider } from "../context/FormContext";
import CadastroCalcado from "../pages/private/admin/cadastrosProduto/CadastroCalcado";
import DadosPessoaisCliente from "../pages/private/admin/cadastrosCliente/DadosPessoaisCliente";
import { StepProvider } from "../context/StepContext";

import Movimentacoes from "../pages/private/admin/movimentacoes/Movimentacoes";
import MovimentacaoFuncionario from "../pages/private/admin/movimentacoes/MovimentacaoFuncionario";

const funcionarioSteps = [
  { path: "cadastro/funcionario/dados-pessoais", label: "Dados Pessoais" },
  { path: "cadastro/funcionario/endereco", label: "Endereço" },
];

const clienteSteps = [
  { path: "cadastro/cliente/dados-pessoais", label: "Dados Pessoais" },
  { path: "cadastro/cliente/endereco", label: "Endereço" },
];

const stepsConfig = [
  { path: "movimentacoes/funcionarios", label: "Funcionários" },
  { path: "clientes", label: "Clientes" },
  { path: "produtos", label: "Produtos" },
  { path: "logins", label: "Logins" },
];

const adminRoutes = [
  <Route
    key="admin"
    path="/dashboard"
    element={
      <PrivateRoute allowedRoles={["admin"]}>
        <StepProvider>
          <DashboardLayout />
        </StepProvider>
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
    <Route path="cadastro" element={<Outlet />}>
      {/* Cadastro de Clientes com steps */}
      <Route
        path="cliente"
        element={
          <FormProvider>
            <Cadastro steps={clienteSteps} />
          </FormProvider>
        }
      >
        <Route path="dados-pessoais" element={<DadosPessoaisCliente />} />
        <Route path="endereco" element={<Endereco />} />
      </Route>

      {/* Cadastro de funcionário com steps */}
      <Route
        path="funcionario"
        element={
          <FormProvider>
            <Cadastro steps={funcionarioSteps} />
          </FormProvider>
        }
      >
        <Route path="dados-pessoais" element={<DadosPessoaisFuncionario />} />
        <Route path="endereco" element={<Endereco />} />
      </Route>
    </Route>

    <Route path="movimentacoes" element={<FormProvider> <Movimentacoes steps={stepsConfig} /> </FormProvider>}>
      <Route
        path="funcionarios"
        element={<MovimentacaoFuncionario/>}
      />
      <Route path="clientes" /*element={<MovimentacaoCliente /> }*/ />
      <Route path="produtos" /*element={<MovimentacaoProduto />} */ />
      <Route path="logins" /*element={<MovimentacaoLogin />} */ />
    </Route>
  </Route>,
];

export default adminRoutes;
