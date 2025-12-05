import styles from "../../styles/TelaVendas.module.css";

const ActionButtons = ({ onExcluir }) => {
  return (
    <div className={styles.actionButtons}>
      <button className={styles.payButton}>PAGAMENTO</button>
      <button className={styles.deleteButton} onClick={onExcluir}>
        EXCLUIR
      </button>
    </div>
  );
};

export default ActionButtons;