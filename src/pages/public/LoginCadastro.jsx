import { useState } from "react";
import { verifyFuncionario, createLogin } from "../../api/LoginAPI";
import styles from "../../styles/LoginCadastro.module.css";

const LoginCadastro = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    id: "",
    nome: "",
    cpf: "",
    userLog: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validarFuncionario = async () => {
    const result = await verifyFuncionario(form);

    if (result.success) {
      setValidated(true);
      setFeedback("Funcionário validado! Agora crie o login.");
    } else {
      setFeedback(result.message || "Erro ao validar.");
    }
  };

  const cadastrarLogin = async () => {
    const result = await createLogin({
      idFuncionario: form.id,
      userLog: form.userLog.toLowerCase(),
      password: form.password,
    });

    setFeedback(result.message);

    if (result.success) {
      // 🔥 Envia mensagem para a tela de Login
      if (onSuccess) {
        onSuccess("Usuário criado com sucesso! Agora faça login.");
      }

      // 🔥 Fecha o modal automaticamente
      onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.container}>
        <div className={styles.forms}>
          <span className={styles.icon} onClick={onClose}>✖</span>

          <h1>Cadastro de Login</h1>

          {!validated && (
            <>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="ID do funcionário"
                  value={form.id}
                  onChange={(e) => handleChange("id", e.target.value)}
                />
              </div>

              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="Nome"
                  value={form.nome}
                  onChange={(e) => handleChange("nome", e.target.value)}
                />
              </div>

              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="CPF"
                  value={form.cpf}
                  onChange={(e) => handleChange("cpf", e.target.value)}
                />
              </div>

              <button className={styles.login} onClick={validarFuncionario}>
                Validar Funcionário
              </button>
            </>
          )}

          {validated && (
            <>
              <div className={styles.inputBox}>
                <input
                  type="text"
                  placeholder="Usuário"
                  value={form.userLog}
                  onChange={(e) => handleChange("userLog", e.target.value)}
                />
              </div>

              <div className={styles.inputBox}>
                <input
                  type="password"
                  placeholder="Senha"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                />
              </div>

              <button className={styles.login} onClick={cadastrarLogin}>
                Criar Login
              </button>
            </>
          )}

          {feedback && <p>{feedback}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginCadastro;