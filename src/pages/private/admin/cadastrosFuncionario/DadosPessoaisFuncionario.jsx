import { useEffect } from "react";
import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import ImagemViewer from "../../../../UI/ImagemViewerInput";
import { useFormStatus } from "../../../../context/FormContext";
import styles from "../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css";
import { campos } from "../../../../utils/campos";

const DadosPessoaisFuncionario = () => {
  const {
    data,
    updateData,
    updateStatus,
    isStepValid,
    foto,
    setFoto,
    fotoPreview,
    setFotoPreview,
  } = useFormStatus();

  const requiredFields = [
    "foto",
    "nome",
    "cpf",
    "telefone",
    "email",
    "status",
    "cargo",
    "dataAdmissao",
    "salario",
    "role",
  ];

  useEffect(() => {
    const valid = isStepValid(requiredFields);
    updateStatus("dados-pessoais", valid);
  }, [data, foto]);

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
          required
        />

        <div className={styles.grid}>
          {campos.map(({ key, ...props }) => (
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

