import {FiSearch } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/cssDashboard/TopBarNavegation.module.css";

const TopBarNavegation = () => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "Dark";

  return (
    <header className={`${styles.topbar} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.left}></div>

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

        {/* MODE BUTTON */}
        {/* <button className={styles.themeButton} onClick={toggleTheme}>
          {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button> */}

      </div>
    </header>
  );
};

export default TopBarNavegation;