import { useNavigate } from 'react-router-dom';
import styles from '../../../styles/Dashboard.module.css'; 

const Dashboard = () => {
  const navigate = useNavigate();

  const sections = [
    { label: 'Cadastrar Funcionário', path: '/dashboard/cadastro/funcionario' },
    // { label: 'Relatórios', path: '/dashboard/relatorios' },
    // { label: 'Configurações', path: '/dashboard/config' },
  ];

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.dashboardTitle}>Painel Administrativo</h1>
      <p className={styles.dashboardSubtitle}>
        Gerencie os cadastros e operações do sistema
      </p>

      <div className={styles.dashboardSections}>
        {sections.map((section) => (
          <button
            key={section.path}
            className={styles.dashboardBtn}
            onClick={() => navigate(section.path)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

