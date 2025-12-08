import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormStatus } from "../../../context/FormContext";
import { useSteps } from "../../../context/StepContext";

import FooterCadastro from "../../../components/componentesCadastro/FooterCadastro";
import ModalFeedBack from "../../../UI/ModalFeedBack";

import styles from "../../../styles/Cadastro.module.css";
import { cadastrarFuncionario } from "../../../api/CadastroFuncionarioAPI";

const Cadastro = ({ steps = [] }) => {
  const [modalMessage, setModalMessage] = useState("");

  // Form context
  const { data, isFormValid } = useFormStatus();

  // Step context
  const { setSteps } = useSteps();

  // Registra os steps apenas quando steps mudarem
  useEffect(() => {
    if (steps.length > 0) {
      setSteps(steps);
    }
  }, [steps]);

  // Checagem global das rotas do formulário
  const canSubmit = isFormValid(steps.map((s) => s.path));

  const handleSubmit = async () => {
    try {
      const result = await cadastrarFuncionario(data);

      if (result.success) {
        setModalMessage(`✅ Funcionário cadastrado com sucesso!\nID: ${result.id}`);
      } else {
        setModalMessage(
          `❌ Erro ao cadastrar: ${result.message || "Erro desconhecido"}`
        );
      }
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setModalMessage("❌ Erro de conexão com o servidor.");
    }
  };

  return (
    <div className={styles.formLayout}>
      <div className={styles.formBody}>
        <Outlet />
      </div>

      <FooterCadastro canSubmit={canSubmit} onSubmit={handleSubmit} />

      <ModalFeedBack
        message={modalMessage}
        onClose={() => setModalMessage("")}
      />
    </div>
  );
};

export default Cadastro;