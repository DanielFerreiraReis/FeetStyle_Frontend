// ======================================================================
// IMPORTAÇÕES
// ======================================================================

// Hooks do React para estado e efeitos colaterais
import { useState, useEffect, useRef } from "react";

// Ícone padrão do logo
import { FcMultipleDevices } from "react-icons/fc";

// Ícones para tema e menu mobile
import { FiMenu, FiX } from "react-icons/fi";

// Lista de botões da sidebar (icones, textos, rotas)
import { buttonsSidebar } from "../../utils/buttonsSidebar";

// Componente individual de botão de navegação
import ButtonNavegation from "./ButtonNavegation";

// Menu do usuário
import UserMenu from "../../UI/UserMenu";

// Botão toggle que altera o tema da aplicação
import ThemeToggleButton from "../../UI/ThemeToggleButton";

import { useTheme } from "../../context/ThemeContext";

// Estilos da sidebar
import styles from "../../styles/cssDashboard/SideBarNavegation.module.css";


// ======================================================================
// COMPONENTE PRINCIPAL: SideBarNavegation
//
// Gerencia:
// - Sidebar expandida/colapsada
// - Tema claro/escuro
// - Menu mobile (hamburger)
// - Renderização dos botões e menu do usuário
// ======================================================================

const SideBarNavegation = () => {
  //referencio para o colapso da SIdebar caso a área de click false
  const sidebarRef = useRef(null);

  // Controle de tema 
  const { theme } = useTheme();
  const darkMode = theme === "Dark";

  // Sidebar retraída (true) ou expandida (false)
  const [collapsed, setCollapsed] = useState(false);

  // Controle do menu mobile aberto/fechado
  const [menuOpen, setMenuOpen] = useState(false);

  // Se o tamanho da tela é mobile (<= 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);


  // ======================================================================
  // EFEITO — Detecta quando a tela é redimensionada para ativar/desativar modo mobile
  // ======================================================================
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);


  // ======================================================================
  // EFEITO — Detecta quando a o click não for em uma área da Sidebar (colapsa/expande)
  // ======================================================================
    useEffect(() => {
    function handleClickOutside(event) {
      const target = event.target;

      // Impede que o sidebar feche ao clicar no botão hambúrguer
      if (target.closest(`.${styles.hamburgerButton}`)) {
        return;
      }

      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        if (isMobile) {
          setMenuOpen(false);
        } else {
          setCollapsed(true);
        }
      }
    }

    // pointerdown captura antes do click e obedece stopPropagation
    document.addEventListener("pointerdown", handleClickOutside);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [isMobile]);


  // ======================================================================
  // FUNÇÕES
  // ======================================================================

  // Alterna sidebar expandida/colapsada
  const toggleSidebar = () => setCollapsed(!collapsed);

  // Abre ou fecha o menu mobile
  const toggleMobileMenu = () => {
    if (isMobile) {
      setMenuOpen(!menuOpen);
    } else {
      toggleSidebar();
    }
  };
  // ======================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ======================================================================
  return (
    <>
      {/* =============================================================
          BOTÃO HAMBÚRGUER (visível sempre, mas funcional no mobile)
      ================================================================ */}
      <button
        className={`${styles.hamburgerButton} ${menuOpen ? styles.active : ""}`}
        onClick={(e) => {
          e.stopPropagation(); // impede que o 'click' chegue ao document
          toggleMobileMenu();
        }}
        title={collapsed ? "Expandir menu" : "Recolher menu"}
        aria-label="Abrir menu"
      >
        {/* Ícone muda se estiver no mobile */}
        {isMobile
          ? (menuOpen ? <FiX size={22} /> : <FiMenu size={22} />)
          : <FiMenu size={22} />}
      </button>


      {/* =============================================================
          SIDEBAR PRINCIPAL
      ================================================================ */}
      <aside
        ref={sidebarRef}
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.sidebarCollapsed : styles.sidebarExpanded}
          ${darkMode ? styles.dark : styles.light}
          ${menuOpen ? styles.menuOpen : ""}
        `}

        // evita que cliques dentro do aside borbulhem até o document
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================== Cabeçalho / Logo ==================== */}
        <div className={`${styles.header} ${collapsed ? styles.headerCollapsed : ""}`}>

          {/* Exibe o logo somente quando expandida */}
          {!collapsed && (
            <div className={styles.logo}>
              <FcMultipleDevices size={26} />
              <span>FeetStyle</span>
            </div>
          )}

          <br />
          <br />
        </div>

        <hr className={styles.separator} />


        {/* ==================== Navegação principal ==================== */}
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


        {/* ==================== Botão de modo escuro/claro ==================== */}
        <div className={styles.themeWrapper}>
          <ThemeToggleButton collapsed={collapsed} />
        </div>

        <hr className={styles.separator} />


        {/* ==================== Rodapé — Menu do usuário ==================== */}
        <div className={styles.footer}>
          {/* Foto do usuário passada como props */}
          <UserMenu
            collapsed={collapsed}
            userImage="src\assets\images\manoPeixada.jpg"
          />
        </div>

      </aside>
    </>
  );
};

export default SideBarNavegation; 