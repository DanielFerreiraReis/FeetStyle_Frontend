import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "../../styles/cssDashboard/SearchBar.module.css";

export default function SearchBar({ placeholder = "Buscar...", onChange }) {
  const [value, setValue] = useState("");

  function handleInput(e) {
    const val = e.target.value;
    setValue(val);
    if (onChange) onChange(val);
  }

  return (
    <div className={styles.container}>
      <button className={styles.searchButton}>
        <FiSearch size={18} className={styles.icon} />
      </button>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleInput}
      />
    </div>
  );
}