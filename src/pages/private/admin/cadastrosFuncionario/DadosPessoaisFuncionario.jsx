import { useEffect } from "react";
import InputCadastro from "../../../../components/componentesCadastro/InputCadastro";
import ImagemViewer from "../../../../UI/ImagemViewerInput";
import { useFormStatus } from "../../../../context/FormContext";
import styles from "../../../../styles/subRotesCss/DadosPessoaisFuncionario.module.css";

const DadosPessoaisFuncionario = () => {
  const { data, updateData, updateStatus, isStepValid, foto, setFoto, fotoPreview, setFotoPreview } = useFormStatus();

  // agora a foto é obrigatória
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
    // ✅ agora verifica se todos os campos (incluindo foto) estão preenchidos
    const valid = isStepValid(requiredFields);
    updateStatus("dados-pessoais", valid);
  }, [data, foto]);

  const handleImageChange = (file, preview) => {
    setFoto(file);
    setFotoPreview(preview);
    updateData("foto", file); // guarda o próprio arquivo
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Dados Pessoais</h2>

      <div className={styles.layoutHorizontal}>
        <div className={styles.grid}>
          <ImagemViewer
            imageUrl={fotoPreview}
            onImageChange={handleImageChange}
            required
          />

          <div className={styles.grid}>
            <InputCadastro
              type="text"
              placeholder="Nome completo"
              value={data.nome || ""}
              onChange={(v) => updateData("nome", v)}
            />
            <InputCadastro
              type="cpf"
              placeholder="CPF"
              value={data.cpf || ""}
              onChange={(v) => updateData("cpf", v)}
            />
            <InputCadastro
              type="telefone"
              placeholder="Telefone"
              value={data.telefone || ""}
              onChange={(v) => updateData("telefone", v)}
            />
            <InputCadastro
              type="email"
              placeholder="E-mail"
              value={data.email || ""}
              onChange={(v) => updateData("email", v)}
            />

            <InputCadastro
              type="select"
              placeholder="Status"
              value={data.status || ""}
              onChange={(v) => updateData("status", v)}
              options={[
                { value: 1, label: "Ativo" },
                { value: 0, label: "Inativo" },
              ]}
            />

            <InputCadastro
              type="select"
              placeholder="Cargo"
              value={data.cargo || ""}
              onChange={(v) => updateData("cargo", v)}
              options={[
                { value: "Atendente", label: "Atendente" },
                { value: "Vendedor", label: "Vendedor" },
              ]}
            />

            <InputCadastro
              type="date"
              placeholder="Data de Admissão"
              value={data.dataAdmissao || ""}
              onChange={(v) => updateData("dataAdmissao", v)}
            />

            <InputCadastro
              type="date"
              placeholder="Data de Demissão"
              value={data.dataDemissao || ""}
              onChange={(v) => updateData("dataDemissao", v)}
            />

            <InputCadastro
              type="number"
              step="0.01"
              placeholder="Salário (R$)"
              value={data.salario || ""}
              onChange={(v) => updateData("salario", v)}
            />
            
            <InputCadastro
              type="select"
              placeholder="Nível de Acesso"
              value={data.role || ""}
              onChange={(v) => updateData("role", v)}
              options={[
                { value: 0, label: "Funcionário" },
                { value: 1, label: "Administrador" },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DadosPessoaisFuncionario;
