import styles from "../../../../styles/subRotesCss/CadastrosCalcados.module.css";

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
}) => (
  <div>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
