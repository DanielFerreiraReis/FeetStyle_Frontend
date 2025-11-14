import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaCircleUser, FaLock, FaLockOpen } from 'react-icons/fa6';
import ModalFeedBack from '../../UI/ModalFeedBack';
import { loginUser } from '../../api/LoginAPi';
import styles from '../../styles/login.module.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!user.trim() || !senha.trim()) {
      setModalMessage('Preencha todos os campos');
      setLoading(false);
      return;
    }

    const data = await loginUser(user, senha);

    if (data.success) {
      login(data.role);
      switch (data.role) {
        case 'admin':
          navigate('/dashboard');
          break;
        case 'vendedor':
          navigate('/TelaDeVendas');
          break;
        default:
          setModalMessage('Cargo não reconhecido');
          break;
      }
    } else {
      setModalMessage(data.message || 'Usuário ou senha inválidos');
    }

    setLoading(false);
  };


  return (
    <main className={styles.container}>
      <form className={styles.forms}  onSubmit={handleSubmit}>
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
          <FaCircleUser size={30} />
        </div>

        <div className={styles.inputBox}>
          <input
            placeholder="Senha"
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            autoComplete="off"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <span onClick={() => setMostrarSenha(!mostrarSenha)} style={{ cursor: 'pointer' }}>
            {mostrarSenha ? <FaLockOpen className={styles.icon} size={28} /> : <FaLock className={styles.icon} size={28} />}
          </span>
        </div>

        <div className={styles.rememberForgot}>
          <label>
            <input type="checkbox" />
            Lembrar senha
          </label>
          <a href="#">Esqueci a senha</a>
        </div>

        <button className={styles.login} type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Login'}
        </button>
      </form>

      <ModalFeedBack message={modalMessage} onClose={() => setModalMessage('')} />
    </main>
  );
};

export default Login;