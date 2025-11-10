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
            { value: "AC", label: "Acre" },
            { value: "AL", label: "Alagoas" },
            { value: "AP", label: "Amapá" },
            { value: "AM", label: "Amazonas" },
            { value: "BA", label: "Bahia" },
            { value: "CE", label: "Ceará" },
            { value: "DF", label: "Distrito Federal" },
            { value: "ES", label: "Espírito Santo" },
            { value: "GO", label: "Goiás" },
            { value: "MA", label: "Maranhão" },
            { value: "MT", label: "Mato Grosso" },
            { value: "MS", label: "Mato Grosso do Sul" },
            { value: "MG", label: "Minas Gerais" },
            { value: "PA", label: "Pará" },
            { value: "PB", label: "Paraíba" },
            { value: "PR", label: "Paraná" },
            { value: "PE", label: "Pernambuco" },
            { value: "PI", label: "Piauí" },
            { value: "RJ", label: "Rio de Janeiro" },
            { value: "RN", label: "Rio Grande do Norte" },
            { value: "RS", label: "Rio Grande do Sul" },
            { value: "RO", label: "Rondônia" },
            { value: "RR", label: "Roraima" },
            { value: "SC", label: "Santa Catarina" },
            { value: "SP", label: "São Paulo" },
            { value: "SE", label: "Sergipe" },
            { value: "TO", label: "Tocantins" }
          ]}
        />

        <InputCadastro
          type="text"
          placeholder="Detalhamento (complemento)"
          value={data.detalhamentoEndereco || ""}
          onChange={(v) => updateData("detalhamentoEndereco", v)}
        />
      </div>
    </div>
  );
};

export default EnderecoFuncionario;
