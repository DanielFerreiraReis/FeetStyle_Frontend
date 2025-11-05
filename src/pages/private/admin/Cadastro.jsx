import { Outlet } from "react-router-dom";
import { useFormStatus } from "../../../context/FormContext";
import TopBarCadastro from "../../../components/componentesCadastro/TopBarCadastro";
import FooterCadastro from "../../../components/componentesCadastro/FooterCadastro";
import styles from "../../../styles/Cadastro.module.css";
import { cadastrarFuncionario } from "../../../api/CadastroFuncionarioAPI";

const Cadastro = ({ steps }) => {
  const { data, isFormValid } = useFormStatus();
  const allSteps = ["dados-pessoais", "endereco"];
  const canSubmit = isFormValid(allSteps);

  const handleSubmit = async () => {
    try {
      // Verifica se há imagem no contexto
      const foto = data.fotoArquivo || null;

      // Envia para o backend
      const result = await cadastrarFuncionario(data, foto);

      if (result.success) {
        alert("✅ Funcionário cadastrado com sucesso!");
        console.log("Retorno do servidor:", result);
      } else {
        alert(`❌ Erro ao cadastrar: ${result.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      alert("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className={styles.formLayout}>
      <TopBarCadastro steps={steps} />

      <div className={styles.formBody}>
        <Outlet />
      </div>

      <FooterCadastro canSubmit={canSubmit} onSubmit={handleSubmit} />
    </div>
  );
};

export default Cadastro;

