import { useEffect } from "react";
import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import ImagemViewer from "../../../../UI/ImagemViewerInput";
import { useFormStatus } from "../../../../context/FormContext";
import styles from "../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css";
import {
  camposClientePF,
  camposClientePJ,
} from "../../../../utils/camposCliente";

const DadosPessoaisCliente = () => {
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

  // Distinção PF / PJ
  const isPF = data.tipoCliente === "PF";
  const camposAtuais = isPF ? camposClientePF : camposClientePJ;

  // Campos obrigatórios
  const requiredFields = [
    "foto",
    ...camposAtuais.filter((c) => c.required).map((c) => c.key),
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
      <h2 className={styles.titulo}>Dados do Cliente</h2>

      {/* Seleção PF/PJ */}
      <div className={styles.tipoCliente}>
        <label>
          <input
            type="radio"
            name="tipoCliente"
            value="PF"
            checked={isPF}
            onChange={() => updateData("tipoCliente", "PF")}
          />
          Pessoa Física
        </label>

        <label>
          <input
            type="radio"
            name="tipoCliente"
            value="PJ"
            checked={!isPF}
            onChange={() => updateData("tipoCliente", "PJ")}
          />
          Pessoa Jurídica
        </label>
      </div>

      <div className={styles.layoutHorizontal}>
        <ImagemViewer
          imageUrl={fotoPreview}
          onImageChange={handleImageChange}
          required
        />

        <div className={styles.grid}>
          {camposAtuais.map(({ key, ...props }) => (
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

export default DadosPessoaisCliente;
