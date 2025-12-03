// ======================================================================
// IMPORTAÇÕES
// ======================================================================

import { useEffect, useRef, useState } from "react";
import { FcMultipleDevices } from "react-icons/fc";
import { FiMenu, FiX } from "react-icons/fi";

import { useTheme } from "../../context/ThemeContext";
import { useLayout } from "../../context/LayoutContext";

import { buttonsSidebar } from "../../utils/buttonsSidebar";

import ButtonNavegation from "./ButtonNavegation";
import UserMenu from "../../UI/UserMenu";
import ThemeToggleButton from "../../UI/ThemeToggleButton";

import styles from "../../styles/cssDashboard/SideBarNavegation.module.css";


// ======================================================================
// COMPONENTE PRINCIPAL
// ======================================================================

const SideBarNavegation = () => {
  const sidebarRef = useRef(null);

  // Tema
  const { theme } = useTheme();
  const darkMode = theme === "Dark";

  // Estado global da sidebar
  const { collapsed, setCollapsed, toggleSidebar } = useLayout();

  // Estado apenas para mobile
  const [menuOpen, setMenuOpen] = useState(false);

  // Detecta mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  // Detecta resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);

      if (!mobile) {
        setMenuOpen(false); // ao sair do mobile, fecha menu
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (!sidebarRef.current) return;

      const clickedInside = sidebarRef.current.contains(e.target);
      const clickedHamburger = e.target.closest(`.${styles.hamburgerButton}`);

      if (clickedHamburger) return;

      if (!clickedInside) {
        if (isMobile) {
          setMenuOpen(false);
        } else {
          setCollapsed(true);
        }
      }
    }

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [isMobile, setCollapsed]);


  // Toggle unificado
  const handleToggle = () => {
    if (isMobile) {
      setMenuOpen(prev => !prev);
    } else {
      toggleSidebar();
    }
  };


  // ======================================================================
  // RENDERIZAÇÃO
  // ======================================================================
  return (
    <>
      {/* Botão hambúrguer */}
      <button
        className={`${styles.hamburgerButton} ${menuOpen ? styles.active : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
      >
        {isMobile ? (menuOpen ? <FiX size={22} /> : <FiMenu size={22} />) : <FiMenu size={22} />}
      </button>

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}
          ${darkMode ? styles.dark : styles.light}
          ${menuOpen ? styles.menuOpen : ""}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* LOGO */}
        <div className={`${styles.header} ${collapsed ? styles.headerCollapsed : ""}`}>
          {!collapsed && (
            <div className={styles.logo}>
              <FcMultipleDevices size={26} />
              <span>FeetStyle</span>
            </div>
          )}
          <br/>
          <br/>
        </div>

        <hr className={styles.separator} />

        {/* Botões */}
        <nav className={styles.nav}>
          {buttonsSidebar.map(({ key, icon, span, rota }) => (
            <ButtonNavegation
              key={key}
              icon={icon}
              span={span}
              rota={rota}
              collapsed={collapsed}
            />
          ))}
        </nav>

        {/* Tema */}
        <div className={styles.themeWrapper}>
          <ThemeToggleButton collapsed={collapsed} />
        </div>

        <hr className={styles.separator} />

        {/* User Menu */}
        <div className={styles.footer}>
          <UserMenu
            collapsed={collapsed}
            userImage="src/assets/images/manoPeixada.jpg"
          />
        </div>
      </aside>
    </>
  );
};

export default SideBarNavegation;