import styles from '../styles/cssUI/ModalFeedback.module.css';

const ModalFeedBack = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
};

export default ModalFeedBack;