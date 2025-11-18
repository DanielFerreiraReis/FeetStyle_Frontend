import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/cssDashboard/SideBarNavegation.module.css";

const ThemeToggleButton = ({ collapsed }) => {
  const { theme, toggleTheme } = useTheme();

  const darkMode = theme === "Dark";

  return (
    <button
      className={`${styles.themeToggle} ${collapsed ? styles.compact : ""}`}
      onClick={toggleTheme}
      aria-pressed={!darkMode}
      title={darkMode ? "Ativar tema claro" : "Ativar tema escuro"}
    >
      <FiSun className="fi-sun" />
      <FiMoon className="fi-moon" />
    </button>
  );
};

export default ThemeToggleButton;
