import { useState, useEffect } from "react";
import styles from "../styles/cssUI/ImageViewer.module.css";

const ImageViewer = ({ imageUrl, label, onUpload }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (imageUrl) setPreview(imageUrl);
  }, [imageUrl]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);
    onUpload(file); // envia o arquivo pra função pai
  };

  return (
    <div className={styles.container}>
      {preview ? (
        <div className={styles.imageBox}>
          {label && <span className={styles.label}>{label}</span>}
          <img src={preview} alt="Imagem" className={styles.image} />
        </div>
      ) : (
        <label className={styles.uploadBox}>
          <span>Enviar uma imagem</span>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}

export default ImageViewer;
