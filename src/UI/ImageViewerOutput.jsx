import styles from "../styles/cssUi/ImagemViewerOutput.module.css";
// import defaultImage from "../assets/images/manoPeixada.jpg";

const ImagemViewerOutput = ({ imageUrl, label = "Imagem" }) => {
  const displayImage = imageUrl;
  return (
    <div className={styles.container}>
      {label && <label className={styles.label}>{label}</label>}

      <div className={styles.imageBox}>
        <img src={displayImage} alt="Imagem exibida" className={styles.image} />
      </div>
    </div>
  );
};

export default ImagemViewerOutput;
