import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/cssDashboard/TopBarNavegation.module.css";

const TopBarNavegation = () => {
  //hook do contexto
  const { theme } = useTheme();
  const darkMode = theme === "Dark";
  return (
    <header
      className={`${styles.topbar} ${darkMode ? styles.dark : styles.light}`}
    >
      <div className={styles.right}>
        {/* SEARCH */}
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
