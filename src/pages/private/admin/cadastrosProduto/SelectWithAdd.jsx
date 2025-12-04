import { IoIosAdd } from "react-icons/io";
import styles from "../../../../styles/subRotesCss/CadastrosCalcados.module.css";

const SelectWithAdd = ({
  label,
  name,
  value,
  onChange,
  options = [],
  optionLabel = "nome",
  optionValue = "id",
  onAdd,
  disabled,
}) => (
  <div>
    <label className={styles.label}>{label}</label>
    <div className={styles.inputGroup}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={styles.select}
        disabled={disabled}
      >
        <option value="" disabled hidden>
          Selecione...
        </option>

        {options.map((item) => (
          <option key={item[optionValue]} value={String(item[optionValue])}>
            {item[optionLabel]}
          </option>
        ))}
      </select>

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          disabled={disabled}
          className={styles.buttonInline}
        >
          <IoIosAdd size={25} />
        </button>
      )}
    </div>
  </div>
);

export default SelectWithAdd;
