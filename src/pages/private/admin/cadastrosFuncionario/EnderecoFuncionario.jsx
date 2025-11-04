import { useEffect } from 'react';
import { useFormStatus } from '../../../../context/FormContext';
import styles from '../../../../styles/subRotesCss/EnderecoFuncionario.module.css';

const EnderecoFuncionario = () => {
  const { updateStatus } = useFormStatus();

  useEffect(() => {
    updateStatus(() => ({ 'endereco': true }));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Endereço do Funcionário</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Rua" required className={styles.input} />
        <input type="number" placeholder="Número da Casa" required className={styles.input} />
        <input type="text" placeholder="Bairro" className={styles.input} />
        <input type="text" placeholder="CEP" required className={styles.input} />
        <input type="text" placeholder="Cidade" required className={styles.input} />
        <input type="text" placeholder="Estado (UF)" required className={styles.input} />
        <input type="text" placeholder="Detalhamento do Endereço" className={styles.input} />
      </form>
    </div>
  );
};

export default EnderecoFuncionario;