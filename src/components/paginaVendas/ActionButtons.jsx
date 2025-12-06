import styles from "../../styles/TelaVendas.module.css";

const ActionButtons = ({ onExcluir, onPagar }) => {
  return (
    <>
      <button
        className={styles.payButton}
        onClick={onPagar}
      >
        PAGAMENTO
      </button>

      <button
        className={styles.deleteButton}
        onClick={onExcluir}
      >
        EXCLUIR
      </button>
    </>
  );
};

export default ActionButtons;