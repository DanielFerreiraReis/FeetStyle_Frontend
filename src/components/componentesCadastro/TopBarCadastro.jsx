import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/Cadastro.module.css';

const TopBarCadastro = ({ steps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.topBar}>
      {steps.map(step => {
        const isActive = location.pathname.includes(step.path);
        return (
          <button
            key={step.path}
            className={`${styles.stepButton} ${isActive ? styles.active : ''}`}
            onClick={() => navigate(step.path)}
          >
            {step.label}
          </button>
        );
      })}
    </div>
  );
};

export default TopBarCadastro;
