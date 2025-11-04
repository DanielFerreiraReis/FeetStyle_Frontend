import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useFormStatus } from '../../../context/FormContext';
import styles from '../../../styles/Cadastro.module.css';

const Cadastro = ({ steps }) => {
  const { status } = useFormStatus();
  const navigate = useNavigate();
  const location = useLocation();

  const allFilled = steps.every((step) => status?.[step.path]);

  return (
    <div className={styles.formLayout}>
      {/* Barra de navegação */}
      <div className={styles.topBar}>
        {steps.map((step) => {
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

      {/* Corpo principal com o Outlet */}
      <div className={styles.formBody}>
        <Outlet /> {/* Etapas do formulário aparecem aqui */}
      </div>

      {/* Rodapé com botão de envio */}
      <div className={styles.formFooter}>
        <button
          className={styles.submitButton}
          disabled={!allFilled}
          onClick={() => alert('Formulário enviado com sucesso!')}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default Cadastro;

