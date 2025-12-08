import { useEffect } from "react";
import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import ImagemViewer from "../../../../UI/ImagemViewerInput";
import { useFormStatus } from "../../../../context/FormContext";
import styles from "../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css";
import { camposFuncionario } from "../../../../utils/camposFuncionario";

const DadosPessoaisFuncionario = () => {
  const {
    data,
    updateData,
    updateStatus,
    isStepValid,
    fotoPreview,
    setFoto,
    setFotoPreview,
  } = useFormStatus();

  // Agora os required já vêm diretamente dos campos
  const requiredFields = [
    "foto",
    ...camposFuncionario.filter(c => c.required).map(c => c.key),
  ];

  useEffect(() => {
    updateStatus("dados-pessoais", isStepValid(requiredFields));
  }, [data, fotoPreview]);

  const handleImageChange = (file, preview) => {
    setFoto(file);
    setFotoPreview(preview);
    updateData("foto", file);
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>Dados Pessoais</h2>

      <div className={styles.layoutHorizontal}>
        <ImagemViewer
          imageUrl={fotoPreview}
          onImageChange={handleImageChange}
        />

        <div className={styles.grid}>
          {camposFuncionario.map(({ key, ...props }) => (
            <InputCadastro
              key={key}
              {...props}
              value={data[key] || ""}
              onChange={(v) => updateData(key, v)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DadosPessoaisFuncionario;