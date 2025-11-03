import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoePrints, FaMoon, FaSun } from "react-icons/fa";
import styles from "../../styles/Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`${styles.homeContainer} ${darkMode ? styles.dark : styles.light}`}>
      <div className={styles.homeContent}>
        {/* Botão de alternância do tema */}
        <button
          className={styles.toggleButton}
          onClick={() => setDarkMode(!darkMode)}
          title="Alternar tema"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className={styles.logoSection}>
          <FaShoePrints className={styles.logoIcon} />
          <h1 className={styles.homeTitle}>FeetStyle</h1>
        </div>

        <p className={styles.homeSubtitle}>
          Bem-vindo ao <strong>FeetStyle</strong> — um sistema logístico desenvolvido
          para gerenciar o estoque, as vendas e o controle administrativo de uma loja
          de sapatos.
        </p>

        <div className={styles.aboutCard}>
          <h2>Sobre o Projeto</h2>
          <p>
            Projeto criado para atender ao recurso da disciplina
            <strong> Programação Web</strong> do curso Técnico em Informática do
            <strong> IFPA Campus Tucuruí</strong>.
          </p>
          <p>
            O objetivo é aplicar conceitos de desenvolvimento web e design responsivo,
            simulando uma aplicação real utilizada em lojas do setor de varejo.
          </p>
        </div>

        <button className={styles.button} onClick={() => navigate("/login")}>
          Entrar no Sistema
        </button>

        <footer className={styles.footer}>
          © {new Date().getFullYear()} FeetStyle — IFPA Tucuruí
        </footer>
      </div>
    </div>
  );
}

export default Home;

