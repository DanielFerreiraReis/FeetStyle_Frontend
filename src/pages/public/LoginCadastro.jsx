import { useState } from "react";
import { verifyFuncionario, createLogin } from "../../api/LoginAPI";

const LoginCadastro = () => {
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
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const validarFuncionario = async () => {
    const result = await verifyFuncionario(form);

    if (result.success) {
      setValidated(true);
      setFeedback("Funcionário validado! Agora crie o login.");
    } else {
      setFeedback(result.message);
      setValidated(false);
    }
  };

  const cadastrarLogin = async () => {
    const result = await createLogin({
      idFuncionario: form.id,
      userLog: form.userLog,
      password: form.password,
    });

    setFeedback(result.message);

    if (result.success) {
      setForm({
        id: "",
        nome: "",
        cpf: "",
        userLog: "",
        password: "",
      });
      setValidated(false);
    }
  };

  return (
    <div className="login-cadastro">

      <h2>Cadastro de Login</h2>

      <input
        type="text"
        placeholder="ID do funcionário"
        value={form.id}
        onChange={e => handleChange("id", e.target.value)}
      />

      <input
        type="text"
        placeholder="Nome"
        value={form.nome}
        onChange={e => handleChange("nome", e.target.value)}
      />

      <input
        type="text"
        placeholder="CPF"
        value={form.cpf}
        onChange={e => handleChange("cpf", e.target.value)}
      />

      <button onClick={validarFuncionario}>
        Validar Funcionário
      </button>

      {validated && (
        <>
          <input
            type="text"
            placeholder="Usuário"
            value={form.userLog}
            onChange={e => handleChange("userLog", e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            value={form.password}
            onChange={e => handleChange("password", e.target.value)}
          />

          <button onClick={cadastrarLogin}>
            Criar Login
          </button>
        </>
      )}

      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default LoginCadastro;