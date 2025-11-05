import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import { useFormStatus } from "../../../../context/FormContext";
import { useEffect } from "react";
import styles from "../../../../styles/subRotesCss/EnderecoFuncionario.module.css";

const EnderecoFuncionario = () => {
  const { data, updateData, updateStatus, isStepValid } = useFormStatus();

  const requiredFields = ["rua", "numCasa", "bairro", "cep", "cidade", "estado"];

  useEffect(() => {
    const valid = isStepValid(requiredFields);
    updateStatus("endereco", valid);
  }, [data]);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Endereço</h2>

      <div className={styles.grid}>
        <InputCadastro type="text" placeholder="Rua" value={data.rua || ""} onChange={(v) => updateData("rua", v)} />
        <InputCadastro type="number" placeholder="Número" value={data.numCasa || ""} onChange={(v) => updateData("numCasa", v)} />
        <InputCadastro type="text" placeholder="Bairro" value={data.bairro || ""} onChange={(v) => updateData("bairro", v)} />
        <InputCadastro type="cep" placeholder="CEP" value={data.cep || ""} onChange={(v) => updateData("cep", v)} />
        <InputCadastro type="text" placeholder="Cidade" value={data.cidade || ""} onChange={(v) => updateData("cidade", v)} />

        <InputCadastro
          type="select"
          placeholder="Estado (UF)"
          value={data.estado || ""}
          onChange={(v) => updateData("estado", v)}
          options={[
            { value: "PA", label: "Pará" },
            { value: "SP", label: "São Paulo" },
            { value: "RJ", label: "Rio de Janeiro" },
            { value: "MG", label: "Minas Gerais" },
            { value: "BA", label: "Bahia" },
            { value: "RS", label: "Rio Grande do Sul" },
            { value: "PR", label: "Paraná" },
          ]}
        />

        <InputCadastro
          type="text"
          placeholder="Detalhamento (complemento, bloco, etc)"
          value={data.detalhamentoEndereco || ""}
          onChange={(v) => updateData("detalhamentoEndereco", v)}
        />
      </div>
    </div>
  );
};

export default EnderecoFuncionario;
