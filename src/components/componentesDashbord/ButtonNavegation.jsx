import { NavLink } from "react-router-dom";
import styles from "../../styles/cssDashboard/ButtonNavegation.module.css";

const ButtonNavegation = ({ icon: Icon, span, rota, collapsed }) => {
  return (
    <NavLink
      to={rota}
      className={({ isActive }) =>
        `${styles.button} ${isActive ? styles.active : ""} ${
          collapsed ? styles.collapsed : ""
        }`
      }
    >
      {Icon && <Icon className={styles.icon} size={18}/>}
      {!collapsed && <span className={styles.label}>{span}</span>}
    </NavLink>
  );
};

export default ButtonNavegation;