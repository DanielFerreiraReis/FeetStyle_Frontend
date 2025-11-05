import { useRef } from "react";
import styles from "../styles/cssUI/ImagemViewerInput.module.css";

const ImagemViewerInput = ({ imageUrl, onImageChange, label = "Selecionar imagem" }) => {
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageChange(file, reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>{label}</label>

      <div
        className={styles.imageBox}
        onClick={() => fileInputRef.current.click()}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="Pré-visualização" className={styles.image} />
        ) : (
          <span className={styles.placeholder}>Clique para selecionar</span>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImagemViewerInput;
