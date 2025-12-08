import { useState } from "react";
import styles from "../../styles/subRotesCss/InputCadastro.module.css";

const formatValue = (type, value) => {
  switch (type) {
    case "cpf":
      return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    case "telefone":
      return value
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/g, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2");
    case "cep":
      return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .slice(0, 9);
    default:
      return value;
  }
};

const InputCadastro = ({
  type = "text",
  placeholder = "...",
  value,
  onChange,
  options = [],
  step,
  label,
  required = false,
}) => {
  const [tipo, setTipo] = useState("text");

  // Função para inputs com máscara
  const handleChange = (e) => {
    if (["cpf", "telefone", "cep"].includes(type)) {
      const raw = e.target.value.replace(/\D/g, ""); // só números
      onChange(raw); // guarda só números no estado
    } else {
      onChange(e.target.value); // guarda texto normal (nome, detalhamento, etc.)
    }
  };

  // Se for um select
  if (type === "select") {
    return (
      <label className={`${styles.label} ${required ? styles.required : ""}`}>
        <span>{label}</span>
        <select
          className={styles.select}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.texto}
            </option>
          ))}
        </select>
      </label>
    );
  }

  // Se for um dataCustom
  if (type === "dataCustom") {
    return (
      <label className={`${styles.label} ${required ? styles.required : ""}`}>
        <span>{label}</span>
        <input
          type={tipo}
          placeholder="Data"
          step={step}
          className={styles.input}
          value={value || ""}
          onChange={handleChange}
          onFocus={() => setTipo("date")}
          onBlur={(e) => !e.target.value && setTipo("text")}
        />
      </label>
    );
  }

  // Se for um input comum
  return (
    <label className={`${styles.label} ${required ? styles.required : ""}`}>
      <span>{label}</span>
      <input
        type={["cpf", "telefone", "cep"].includes(type) ? "text" : type}
        placeholder={placeholder}
        step={step}
        className={styles.input}
        // exibe formatado, mas guarda só números
        value={
          ["cpf", "telefone", "cep"].includes(type)
            ? formatValue(type, value || "")
            : value || ""
        }
        onChange={handleChange}
        maxLength={
          type === "cpf"
            ? 14
            : type === "telefone"
            ? 15
            : type === "cep"
            ? 9
            : undefined
        }
      />
    </label>
  );
};

export default InputCadastro;
