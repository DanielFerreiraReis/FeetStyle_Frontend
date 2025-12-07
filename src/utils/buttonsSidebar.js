import { FaHome, FaUser} from "react-icons/fa";
import { Fa42Group } from "react-icons/fa6";

export const buttonsSidebar = [
    { key: "funcionarios", span: "Cadastrar Funcionário", rota: "/dashboard/cadastro/funcionario", icon: FaHome },
    // { key: "users", span: "Usuários", rota: "/users", icon: FaUser },
    { key: "calcados", span:"Cadastrar Calçados", rota:"/dashboard/calcados", icon: Fa42Group },
    { key: "clientes", span:"Cadastrar Clientes", rota:"/dashboard/cadastro/cliente", icon: FaUser},
];