import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCircleUser, FaLock, FaLockOpen } from "react-icons/fa6";
import ModalFeedBack from "../../UI/ModalFeedBack";
import LoginCadastro from "../../pages/public/LoginCadastro";
import { loginUser } from "../../api/LoginAPI";
import styles from "../../styles/login.module.css";

const Login = () => {
  const { login, isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [abrirCadastroLogin, setAbrirCadastroLogin] = useState(false);

  // Redireciona automaticamente se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated && userRole) {
      if (userRole === "admin") navigate("/dashboard");
      else if (userRole === "vendedor") navigate("/TelaDeVendas");
    }
  }, [isAuthenticated, userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user.trim() || !senha.trim()) {
      setModalMessage("Preencha todos os campos");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(user, senha);
      console.log("Resposta da API:", data);

      if (data.success && data.token) {
        login(data.role, data.token);

        if (data.role === "admin") navigate("/dashboard");
        else if (data.role === "vendedor") navigate("/TelaDeVendas");
        else setModalMessage("Cargo não reconhecido");
      } else {
        setModalMessage(data.message || "Usuário ou senha inválidos");
      }
    } catch (error) {
      setModalMessage("Erro ao conectar com o servidor");
    }

    setLoading(false);
  };

  return (
    <main className={styles.container}>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className={styles.inputBox}>
          <input
            placeholder="Usuário"
            type="text"
            id="user"
            autoComplete="off"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <FaCircleUser className={styles.icon} size={28} />
        </div>

        <div className={styles.inputBox}>
          <input
            placeholder="Senha"
            type={mostrarSenha ? "text" : "password"}
            id="senha"
            autoComplete="off"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <span
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className={styles.toggleIcon}
          >
            {mostrarSenha ? (
              <FaLockOpen className={styles.icon} size={28} />
            ) : (
              <FaLock className={styles.icon} size={28} />
            )}
          </span>
        </div>

        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" />
            Lembrar senha
          </label>
          <a onClick={() => setAbrirCadastroLogin(true)}>Cadastrar Login</a>
        </div>

        <button className={styles.login} type="submit" disabled={loading}>
          {loading ? "Entrando..." : "Login"}
        </button>
      </form>

      {abrirCadastroLogin && (
        <LoginCadastro
          onClose={() => setAbrirCadastroLogin(false)}
          onSuccess={(msg) => {
            setModalMessage(msg); // abre o ModalFeedBack
            setAbrirCadastroLogin(false); // fecha o modal de cadastro
          }}
        />
      )}
    </main>
  );
};

export default Login;
