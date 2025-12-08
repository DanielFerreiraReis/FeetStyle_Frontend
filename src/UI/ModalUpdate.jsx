import { useEffect } from "react";
import styles from "../styles/cssUI/ModalUpdate.module.css";
import { useFormStatus } from "../context/FormContext";

const ModalUpdate = ({ isOpen, onClose, entity, data, onSave, fields }) => {
  const { data: formData, updateData, foto, setFoto, fotoPreview, setFotoPreview } = useFormStatus();

  useEffect(() => {
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        updateData(key, value);
      });
      if (data.foto) {
        setFoto(data.foto);
        setFotoPreview(data.foto);
      }
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setFotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    onSave({ ...formData, foto: foto });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h2>Editar {entity}</h2>
        {fields.map((field) => (
          <label key={field.name}>
            {field.label}:
            {field.type === "file" ? (
              <>
                <input type="file" onChange={handleFileChange} />
                {fotoPreview && <img src={fotoPreview} alt="Preview" style={{ width: "80px", borderRadius: "50%" }} />}
              </>
            ) : field.type === "select" ? (
              <select
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => updateData(field.name, e.target.value)}
              >
                {field.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={(e) => updateData(field.name, e.target.value)}
              />
            )}
          </label>
        ))}
        <div className={styles.actions}>
          <button onClick={handleSubmit}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;