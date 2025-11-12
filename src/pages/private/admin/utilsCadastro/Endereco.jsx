import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import { useFormStatus } from "../../../../context/FormContext";
import { useEffect } from "react";
import styles from "../../../../styles/subRotesCss/EnderecoFuncionario.module.css";
import { camposEndereco } from "../../../../utils/camposEndereco";

const EnderecoFuncionario = () => {
  const { data, updateData, updateStatus, isStepValid } = useFormStatus();

  const requiredFields = ["rua", "numCasa", "bairro", "cep", "cidade", "estado"];

  useEffect(() => {
    const valid = isStepValid(requiredFields);
    updateStatus("endereco", valid);
  }, [data]);

  return (
    <section className={styles.container}>
      <h2 className={styles.titulo}>Endereço</h2>

      <div className={styles.grid}>
        {camposEndereco.map(({key, ...props}) => (
            <InputCadastro
              key={key}
              {...props}
              value={data[key] || ""}
              onChange={(v) => updateData(key,v)}
            />
          ))}
      </div>
    </section>
  );
};

export default EnderecoFuncionario;
