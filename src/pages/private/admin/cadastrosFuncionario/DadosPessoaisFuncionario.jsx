import { useEffect } from 'react';
import { useFormStatus } from '../../../../context/FormContext';
import styles from '../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css';

const DadosPessoaisFuncionario = () => {
  const { updateStatus, data, updateData } = useFormStatus();

  useEffect(() => {
    updateStatus('dados-pessoais', true); // Marca essa etapa como preenchida
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Dados Pessoais do Funcionário</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Nome" required className={styles.input}
          value={data.nome || ''} onChange={e => updateData('nome', e.target.value)} />
        <input type="tel" placeholder="Telefone" required className={styles.input}
          value={data.telefone || ''} onChange={e => updateData('telefone', e.target.value)} />
        <input type="email" placeholder="Email" required className={styles.input}
          value={data.email || ''} onChange={e => updateData('email', e.target.value)} />
        <select required className={styles.select}
          value={data.status || ''} onChange={e => updateData('status', e.target.value)}>
          <option value="">Status</option>
          <option value="1">Ativo</option>
          <option value="0">Inativo</option>
        </select>
        <input type="text" placeholder="Cargo" required className={styles.input}
          value={data.cargo || ''} onChange={e => updateData('cargo', e.target.value)} />
        <input type="date" placeholder="Data de Admissão" required className={styles.input}
          value={data.admissao || ''} onChange={e => updateData('admissao', e.target.value)} />
        <input type="date" placeholder="Data de Demissão" className={styles.input}
          value={data.demissao || ''} onChange={e => updateData('demissao', e.target.value)} />
        <input type="number" step="0.01" placeholder="Salário" required className={styles.input}
          value={data.salario || ''} onChange={e => updateData('salario', e.target.value)} />
        <input type="text" placeholder="CPF" required className={styles.input}
          value={data.cpf || ''} onChange={e => updateData('cpf', e.target.value)} />
        <input type="text" placeholder="URL da Foto" required className={styles.input}
          value={data.foto || ''} onChange={e => updateData('foto', e.target.value)} />
        <select required className={styles.select}
          value={data.funcao || ''} onChange={e => updateData('funcao', e.target.value)}>
          <option value="">Função</option>
          <option value="0">Funcionário</option>
          <option value="1">Admin</option>
        </select>
      </form>
    </div>
  );
};

export default DadosPessoaisFuncionario;