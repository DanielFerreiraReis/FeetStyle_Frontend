import { useState } from "react";
import { useFormStatus } from "../../../../context/FormContext";
import { useTheme } from "../../../../context/ThemeContext";
import ImagemViewerInput from "../../../../UI/ImagemViewerInput";
import styles from "../../../../styles/subRotesCss/CadastrosProdutos.module.css";

function CadastroCalcado() {
  const { data, updateData, foto, setFoto, fotoPreview, setFotoPreview, isStepValid } = useFormStatus();
  const { theme, toggleTheme } = useTheme();

  const [marcas] = useState([{ idMarca: 1, nomeMarca: "Nike" }, { idMarca: 2, nomeMarca: "Adidas" }]);
  const [tipos] = useState([{ idTipo: 1, nomeTipo: "Tênis" }, { idTipo: 2, nomeTipo: "Sandália" }]);
  const [modelos] = useState([{ idModelo: 1, nomeModelo: "AirMax" }, { idModelo: 2, nomeModelo: "Yeezy" }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData(name, value);
  };

  const handleImageChange = (file, preview) => {
    setFoto(file);
    setFotoPreview(preview);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const camposObrigatorios = ["marca", "tipo", "modelo", "cor", "tamanho", "preco", "quantidade", "foto"];

    if (!isStepValid(camposObrigatorios)) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    console.log("Dados enviados:", { ...data, foto });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Cadastro de Calçado</h2>
      <button type="button" onClick={toggleTheme} className={styles.button}>
        Alternar Tema ({theme})
      </button>

      <label className={styles.label}>Marca:</label>
      <select name="marca" value={data.marca || ""} onChange={handleChange} className={styles.select}>
        <option value="">Selecione...</option>
        {marcas.map((m) => (
          <option key={m.idMarca} value={m.idMarca}>{m.nomeMarca}</option>
        ))}
      </select>
      <button type="button" className={styles.button}>+ Adicionar</button>

      <label className={styles.label}>Tipo:</label>
      <select name="tipo" value={data.tipo || ""} onChange={handleChange} className={styles.select}>
        <option value="">Selecione...</option>
        {tipos.map((t) => (
          <option key={t.idTipo} value={t.idTipo}>{t.nomeTipo}</option>
        ))}
      </select>
      <button type="button" className={styles.button}>+ Adicionar</button>

      <label className={styles.label}>Modelo:</label>
      <select name="modelo" value={data.modelo || ""} onChange={handleChange} className={styles.select}>
        <option value="">Selecione...</option>
        {modelos.map((mod) => (
          <option key={mod.idModelo} value={mod.idModelo}>{mod.nomeModelo}</option>
        ))}
      </select>
      <button type="button" className={styles.button}>+ Adicionar</button>

      <label className={styles.label}>Cor:</label>
      <input type="text" name="cor" value={data.cor || ""} onChange={handleChange} className={styles.input} />

      <label className={styles.label}>Tamanho:</label>
      <input type="text" name="tamanho" value={data.tamanho || ""} onChange={handleChange} className={styles.input} />

      <label className={styles.label}>Preço:</label>
      <input type="number" step="0.01" name="preco" value={data.preco || ""} onChange={handleChange} className={styles.input} />

      <label className={styles.label}>Quantidade:</label>
      <input type="number" name="quantidade" value={data.quantidade || ""} onChange={handleChange} className={styles.input} />

      <ImagemViewerInput
        imageUrl={fotoPreview}
        onImageChange={handleImageChange}
        label="Foto do Calçado"
      />

      <button type="submit" className={styles.button}>Salvar Calçado</button>
    </form>
  );
}

export default CadastroCalcado;