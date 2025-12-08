import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useSteps } from "../../context/StepContext";
import { NavLink, useLocation } from "react-router-dom";
import styles from "../../styles/cssDashboard/TopBarNavegation.module.css";

const TopBarNavegation = () => {
  const { theme } = useTheme();
  const { steps } = useSteps();
  const location = useLocation();

  const darkMode = theme === "Dark";

  const isCadastroRoute = [
    "/dashboard/cadastro",
    "/dashboard/movimentacoes",
  ].some((path) => location.pathname.includes(path));
  const showSteps = isCadastroRoute && steps.length > 0;

  return (
    <header
      className={`${styles.topbar} 
      ${darkMode ? styles.dark : styles.light} 
      ${showSteps ? styles.withSteps : ""}`}
    >
      {showSteps && (
        <div className={styles.stepsWrap}>
          <nav className={styles.stepsNav}>
            {steps.map((s) => (
              <NavLink
                key={s.path}
                to={s.path}
                className={({ isActive }) =>
                  `${styles.stepItem} ${isActive ? styles.active : ""}`
                }
              >
                {s.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      <div className={styles.right}>
        <div className={styles.searchContainer}>
          <FiSearch size={18} className={styles.icon} />
          <input
            type="text"
            placeholder="Pesquisar..."
            className={styles.input}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBarNavegation;
