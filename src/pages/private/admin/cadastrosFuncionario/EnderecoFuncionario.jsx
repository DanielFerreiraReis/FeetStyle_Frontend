import { useEffect } from 'react';
import { useFormStatus } from '../../../../context/FormContext';
import styles from '../../../../styles/subRotesCss/EnderecoFuncionario.module.css';

const EnderecoFuncionario = () => {
  const { updateStatus, data, updateData } = useFormStatus();

  useEffect(() => {
    updateStatus('endereco', true); // Marca essa etapa como preenchida
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Endereço do Funcionário</h2>
      <form className={styles.form}>
        <input type="text" placeholder="Rua" required className={styles.input}
          value={data.rua || ''} onChange={e => updateData('rua', e.target.value)} />
        <input type="number" placeholder="Número da Casa" required className={styles.input}
          value={data.numero || ''} onChange={e => updateData('numero', e.target.value)} />
        <input type="text" placeholder="Bairro" className={styles.input}
          value={data.bairro || ''} onChange={e => updateData('bairro', e.target.value)} />
        <input type="text" placeholder="CEP" required className={styles.input}
          value={data.cep || ''} onChange={e => updateData('cep', e.target.value)} />
        <input type="text" placeholder="Cidade" required className={styles.input}
          value={data.cidade || ''} onChange={e => updateData('cidade', e.target.value)} />
        <input type="text" placeholder="Estado (UF)" required className={styles.input}
          value={data.estado || ''} onChange={e => updateData('estado', e.target.value)} />
        <input type="text" placeholder="Detalhamento do Endereço" className={styles.input}
          value={data.detalheEndereco || ''} onChange={e => updateData('detalheEndereco', e.target.value)} />
      </form>
    </div>
  );
};

export default EnderecoFuncionario;
