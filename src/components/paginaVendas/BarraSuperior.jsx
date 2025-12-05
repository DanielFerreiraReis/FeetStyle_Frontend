import styles from "../../styles/BarraSuperior.module.css";

const BarraSuperior = ({ onVoltar }) => {
  return (
    <header className={styles.container}>
      <div className={styles.logo}>
        <h1>Sistema de Vendas</h1>
      </div>
      <button className={styles.botaoVoltar} onClick={onVoltar}>
        Voltar
      </button>
    </header>
  );
};

export default BarraSuperior;
