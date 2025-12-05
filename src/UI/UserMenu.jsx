// ======================================================================
// IMPORTAÇÕES
// ======================================================================

// Hook de estado, referência e efeitos do React
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

// Ícone padrão de usuário (caso não tenha foto)
import { FaUserCircle } from "react-icons/fa";

// Estilos CSS modularizados
import styles from "../styles/cssUI//UserMenu.module.css";


// ======================================================================
// COMPONENTE: UserMenu
//
// Props:
// - collapsed: boolean → indica se a sidebar está compactada
// - userImage: string → URL da foto do usuário (opcional)
// ======================================================================
const UserMenu = ({ collapsed, userImage }) => {

  // Controla se o dropdown está aberto ou fechado
  const [open, setOpen] = useState(false);

  // Define se o menu abre para cima (true) ou para baixo (false)
  const [openUp, setOpenUp] = useState(false);

  // Referência ao container geral do componente
  const containerRef = useRef(null);


  // ======================================================================
  // EFEITO 1 — Detecta se o dropdown deve abrir para cima ou para baixo
  //
  // Lógica:
  // - Quando o menu abre, calcula o espaço disponível abaixo do botão.
  // - Se não houver espaço suficiente, ativa 'openUp' para abrir para cima.
  // ======================================================================
  useEffect(() => {

    // Continua apenas se o menu está aberto e existe o elemento
    if (open && containerRef.current) {

      // Pega posição do container na tela
      const rect = containerRef.current.getBoundingClientRect();

      // Calcula espaço restante abaixo
      const spaceBelow = window.innerHeight - rect.bottom;

      // Altura estimada do dropdown
      const dropdownHeight = 180;

      // Se o espaço for menor que a altura, abre pra cima
      setOpenUp(spaceBelow < dropdownHeight);
    }

  }, [open]); // Recalcula sempre que "open" mudar


  // ======================================================================
  // EFEITO 2 — Fecha o dropdown quando o usuário clica fora do menu
  //
  // Lógica:
  // - Escuta cliques no documento.
  // - Se o clique não estiver dentro do container, fecha o menu.
  // ======================================================================
  useEffect(() => {

    const handleClickOutside = (e) => {
      // Se existe o elemento e o clique NÃO está dentro dele → fechar menu
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    // Adiciona listener global
    document.addEventListener("mousedown", handleClickOutside);

    // Remove listener ao desmontar o componente
    return () => document.removeEventListener("mousedown", handleClickOutside);

  }, []);
  
  //função logout sendo usada para deslogar o usuário
  const { logout } = useAuth();

  // ======================================================================
  // RENDERIZAÇÃO DO COMPONENTE
  // ======================================================================
  return (
    <div className={styles.userMenuContainer} ref={containerRef}>

      {/* ================= Botão do usuário (avatar + nome) ================= */}
      <div className={styles.userMenu} onClick={() => setOpen(!open)}>
        
        {/* Se o usuário tiver foto → usar foto, senão → usar ícone */}
        {userImage ? (
          <img
            src={userImage}
            alt="User avatar"
            className={styles.userAvatar}
          />
        ) : (
          <FaUserCircle size={28} className={styles.userIcon} />
        )}

        {/* Mostra nome apenas se a sidebar não estiver colapsada */}
        {!collapsed && <span className={styles.username}>mdo</span>}
      </div>


      {/* ================= Dropdown ================= */}
      {open && (
        <div
          className={`${styles.dropdown} ${
            openUp ? styles.openUp : styles.openDown
          }`}
        >
          <ul>
            <li>New project...</li>
            <li>Settings</li>
            <li>Profile</li>
          </ul>

          <hr />

          {/* botão de sair */}
          <div onClick={() => logout()} className={styles.signout}>Sign out</div>
        </div>
      )}

    </div>
  );
};

export default UserMenu;