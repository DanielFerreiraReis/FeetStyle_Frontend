import { useEffect } from 'react';
import { useFormStatus } from '../../../../context/FormContext';
import styles from '../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css';

const DadosPessoaisFuncionario = () => {
  const { updateStatus } = useFormStatus();

  useEffect(() => {
    updateStatus(() => ({ 'dados-pessoais': true }));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dados Pessoais do Funcionário</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Nome" required className={styles.input} />
        <input type="tel" placeholder="Telefone" required className={styles.input} />
        <input type="email" placeholder="Email" required className={styles.input} />
        <select required className={styles.select}>
          <option value="">Status</option>
          <option value="1">Ativo</option>
          <option value="0">Inativo</option>
        </select>
        <input type="text" placeholder="Cargo" required className={styles.input} />
        <input type="date" placeholder="Data de Admissão" required className={styles.input} />
        <input type="date" placeholder="Data de Demissão" className={styles.input} />
        <input type="number" step="0.01" placeholder="Salário" required className={styles.input} />
        <input type="text" placeholder="CPF" required className={styles.input} />
        <input type="text" placeholder="URL da Foto" required className={styles.input} />
        <select required className={styles.select}>
          <option value="">Função</option>
          <option value="0">Funcionário</option>
          <option value="1">Admin</option>
        </select>
      </form>
    </div>
  );
};

export default DadosPessoaisFuncionario;