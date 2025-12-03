import { useState, useEffect } from 'react'; // Adicionado useEffect
import styles from "../styles/subRotesCss/CadastrosCalcados.module.css"; // Reutiliza os estilos

const ModalCreate = ({ title, onClose, onSave, campos, infoAdicional }) => {
    // Inicializa o estado com valores vazios para cada campo do modal
    const initialState = campos.reduce((acc, campo) => {
        // Se houver defaultValue, usa-o, caso contrário, usa string vazia
        const value = campo.defaultValue !== undefined ? campo.defaultValue : '';
        return { ...acc, [campo.name]: value };
    }, {});
    
    const [dados, setDados] = useState(initialState);

    // Garante que os campos de valor padrão (como o ID do Tipo no modal Modelo) sejam atualizados
    useEffect(() => {
        const defaultValues = campos
            .filter(campo => campo.defaultValue !== undefined)
            .reduce((acc, campo) => ({ ...acc, [campo.name]: campo.defaultValue }), {});
        
        if (Object.keys(defaultValues).length > 0) {
            // Atualiza o estado apenas com os valores padrão
            setDados(prev => ({ ...prev, ...defaultValues }));
        }
    }, [campos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDados(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        const valido = campos.every(campo => {
            // Ignora a validação para campos somente leitura, pois o valor vem do prop
            if (campo.readOnly) return true;
            
            return dados[campo.name] !== undefined && dados[campo.name] !== null && dados[campo.name] !== '';
        });
        
        if (!valido) {
            console.error('Preencha todos os campos obrigatórios do modal!');
            return;
        }

        onSave(dados);
    };

    return (
        // CORREÇÃO CRUCIAL: Usar styles.modalBackdrop, que tem position: fixed e z-index alto.
        // Clicar aqui (fora do modalContent) fecha o modal.
        <div className={styles.modalBackdrop} onClick={onClose}>
            {/* Adiciona stopPropagation para que o clique no conteúdo não feche o modal */}
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                
                <header className={styles.modalHeader}>
                    <h3>{title}</h3>
                    <button type="button" onClick={onClose} className={styles.modalCloseButton}>
                        &times;
                    </button>
                </header>

                {campos.map((campo) => (
                    <div key={campo.name}>
                        <label className={styles.label}>{campo.label}:</label>
                        {campo.type === 'select' ? (
                            <select 
                                name={campo.name} 
                                value={dados[campo.name]} 
                                onChange={handleChange} 
                                className={styles.select}
                                disabled={campo.readOnly}
                            >
                                <option value="">Selecione...</option>
                                {campo.options && campo.options.map(option => (
                                    <option 
                                        key={option.value || option} 
                                        value={option.value || option}
                                    >
                                        {option.label || option}
                                    </option>
                                ))}
                            </select>
                        ) : campo.type === 'textarea' ? (
                             <textarea
                                name={campo.name}
                                value={dados[campo.name]}
                                onChange={handleChange}
                                className={styles.input}
                                rows="3"
                                disabled={campo.readOnly}
                             />
                        ) : (
                            <input
                                type={campo.type}
                                name={campo.name}
                                // Valor: usa o valor padrão se for readOnly, senão usa o estado
                                value={campo.readOnly ? campo.defaultValue : dados[campo.name]}
                                onChange={!campo.readOnly ? handleChange : undefined} // Só permite onChange se não for readOnly
                                className={styles.input}
                                readOnly={campo.readOnly}
                                style={campo.readOnly ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
                            />
                        )}
                    </div>
                ))}
                
                {/* Informação Adicional (Modelo Modal) */}
                {infoAdicional && <p style={{ fontSize: '0.85em', color: 'var(--text-color)', marginTop: '10px', opacity: 0.8 }}>{infoAdicional}</p>}


                {/* Botões de Ação do Modal */}
                <div className={styles.modalButtons}>
                    <button type="button" onClick={onClose} className={styles.buttonCancel}>
                        Cancelar
                    </button>
                    <button type="button" onClick={handleSave} className={styles.buttonSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCreate;