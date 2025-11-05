import styles from '../../styles/subRotesCss/DadosPessoaisFuncionario.module.css';

const formatValue = (type, value) => {
  switch (type) {
    case 'cpf':
      return value
        .replace(/\D/g, '') // remove tudo que não é número
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    
    case 'telefone':
      return value
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    
    case 'cep':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    
    default:
      return value;
  }
};

const InputCadastro = ({
  type = "text",
  placeholder,
  value,
  onChange,
  options = [],
  step,
}) => {
  // Se for um select
  if (type === "select") {
    return (
      <select
        className={styles.select}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  // Input com máscara dinâmica
  const handleChange = (e) => {
    const formatted = formatValue(type, e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type={type === "cpf" || type === "telefone" || type === "cep" ? "text" : type}
      placeholder={placeholder}
      step={step}
      className={styles.input}
      value={value || ""}
      onChange={handleChange}
      maxLength={
        type === "cpf" ? 14 :
        type === "telefone" ? 15 :
        type === "cep" ? 9 : undefined
      }
    />
  );
};

export default InputCadastro;

