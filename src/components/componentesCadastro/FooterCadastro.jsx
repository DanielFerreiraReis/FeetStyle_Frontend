import styles from '../../styles/Cadastro.module.css';

const FooterCadastro = ({ canSubmit, onSubmit }) => {
  const handleClick = (e) => {
    e.preventDefault(); // evita comportamento padrão de form
    if (canSubmit && onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className={styles.formFooter}>
      <button
        type="button" // evita submit automático
        className={styles.submitButton}
        disabled={!canSubmit}
        onClick={handleClick}
      >
        Enviar
      </button>
    </div>
  );
};

export default FooterCadastro;