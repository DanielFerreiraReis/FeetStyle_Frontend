import { Outlet } from "react-router-dom";
import { useFormStatus } from "../../../context/FormContext";
import TopBarCadastro from "../../../components/componentesCadastro/TopBarCadastro";
import FooterCadastro from "../../../components/componentesCadastro/FooterCadastro";
import ModalFeedBack from "../../../UI/ModalFeedBack"
import styles from "../../../styles/Cadastro.module.css";
import { cadastrarFuncionario } from "../../../api/CadastroFuncionarioAPI";
import { useState } from "react";
  
const Cadastro = ({ steps }) => {
  const [modalMessage, setmodalMessage] = useState('');
  const { data, isFormValid } = useFormStatus();
  const allSteps = ["dados-pessoais", "endereco"];
  const canSubmit = isFormValid(allSteps);

  const handleSubmit = async () => {
    try {
      const result = await cadastrarFuncionario(data);

      if (result.success) {
        setmodalMessage("✅ Funcionário cadastrado com sucesso!");
        console.log("Retorno do servidor:", result);
        setmodalMessage(`✅ Funcionário cadastrado com sucesso!\nID: ${result.id}`);
      } else {
        setmodalMessage(`❌ Erro ao cadastrar: ${result.message || "Erro desconhecido"}`);
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setmodalMessage("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className={styles.formLayout}>
      <TopBarCadastro steps={steps} />

      <div className={styles.formBody}>
        <Outlet />
      </div>

      <FooterCadastro canSubmit={canSubmit} onSubmit={handleSubmit} />

    <ModalFeedBack message={modalMessage} onClose={() => setmodalMessage('')} />
    </div>
  );
};

export default Cadastro;