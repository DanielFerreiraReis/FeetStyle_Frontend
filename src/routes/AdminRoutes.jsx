//React imports
import { Outlet, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

//pages imports
import DashboardLayout from "../pages/private/admin/DashboardLayout";
import Cadastro from "../pages/private/admin/Cadastro";
import DadosPessoaisFuncionario from "../pages/private/admin/cadastrosFuncionario/DadosPessoaisFuncionario";
import Endereco from "../pages/private/admin/utilsCadastro/Endereco";
import CadastroCalcado from "../pages/private/admin/cadastrosProduto/CadastroCalcado";
import DadosPessoaisCliente from "../pages/private/admin/cadastrosCliente/DadosPessoaisCliente";
import Movimentacoes from "../pages/private/admin/movimentacoes/Movimentacoes";
import MovimentacaoFuncionario from "../pages/private/admin/movimentacoes/MovimentacaoFuncionario";

//context imports
import { FormProvider } from "../context/FormContext";
import { StepProvider } from "../context/StepContext";


const funcionarioSteps = [
  { 
    key: "dados-pessoais", 
    path: "cadastro/funcionario/dados-pessoais", 
    label: "Dados Pessoais" 
  },
  { 
    key: "endereco", 
    path: "cadastro/funcionario/endereco", 
    label: "Endereço" 
  },
];


const clienteSteps = [
  { 
    key: "dados-pessoais", 
    path: "cadastro/cliente/dados-pessoais", 
    label: "Dados Pessoais" 
  },
  { 
    key: "endereco",
    path: "cadastro/cliente/endereco",
    label: "Endereço" 
  },
];

const stepsConfig = [
  { 
    key: "funcionario" , 
    path: "movimentacoes/funcionarios", 
    label: "Funcionários" 
  },
  { key: "cliente" ,
    path: "clientes", 
    label: "Clientes" 
  },
  { 
    key: "produto" , 
    path: "produtos", 
    label: "Produtos" 
  },
  { 
    key: "login" , 
    path: "logins", 
    label: "Logins" 
  },
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
    <Route index element={<Navigate to={"cadastro/funcionario"} replace /> }/>

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
        <Route index element={<Navigate to="dados-pessoais" replace />} />
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
        <Route index element={<Navigate to="dados-pessoais" replace />} />
        <Route path="dados-pessoais" element={<DadosPessoaisFuncionario />} />
        <Route path="endereco" element={<Endereco />} />
      </Route>
    </Route>

    <Route path="movimentacoes" element={
        <FormProvider> 
          <Movimentacoes steps={stepsConfig} /> 
        </FormProvider>
      }
    >
      <Route index element={<Navigate to="funcionarios" replace />} />
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
