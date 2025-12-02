import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Unauthorized.module.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.caixa}>
      <h1>Acesso negado</h1>
      <p>Você não tem permissão para acessar esta página.</p>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default Unauthorized;