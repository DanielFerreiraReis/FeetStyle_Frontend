import { useState, useEffect } from "react";
import { useFormStatus } from "../../../../context/FormContext";
import ImagemViewerInput from "../../../../UI/ImagemViewerInput";
import ModalCreate from "../../../../UI/ModalCreate";
import styles from "../../../../styles/subRotesCss/CadastrosCalcados.module.css";
import {
  fetchEntidades,
  cadastrarNovaEntidade,
  API_BASE,
} from "../../../../api/CadastroSapatos";
import FeetStyle from "../../../../assets/mySvgIcons/FeetStyle";
import InputField from "./InputField";
import SelectWithAdd from "./SelectWithAdd";
// ===============================================
//           COMPONENTE PRINCIPAL
// ===============================================

function CadastroCalcado() {
  const { data, updateData, foto, setFoto, fotoPreview, setFotoPreview } =
    useFormStatus();

  const [marcas, setMarcas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [modalAberto, setModalAberto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar dados iniciais do backend
  useEffect(() => {
    const loadData = async () => {
      try {
        const [marcasData, tiposData, modelosData] = await Promise.all([
          fetchEntidades("marca"),
          fetchEntidades("tipo"),
          fetchEntidades("modelo"),
        ]);
        setMarcas(marcasData);
        setTipos(tiposData);
        setModelos(modelosData);
      } catch (error) {
        console.error("Erro ao carregar dados iniciais:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const processedValue =
      name.startsWith("id") ||
      name === "quantidadeEmStoque" ||
      name === "precoSapato"
        ? Number(value)
        : value;
    updateData(name, processedValue);
    if (name === "idTipo") {
      updateData("idModelo", "");
    }
  };

  const handleImageChange = (file, preview) => {
    setFoto(file);
    setFotoPreview(preview);
    updateData("foto", file);
  };

  const handleNovoCadastro = async (entidade, dadosModal) => {
    if (entidade === "modelo") {
      dadosModal.idTipos = data.idTipo;
    }

    const novoItem = await cadastrarNovaEntidade(entidade, dadosModal);

    if (entidade === "marca") {
      setMarcas((prev) => [...prev, novoItem]);
      updateData("idMarca", novoItem.idMarca);
    } else if (entidade === "tipo") {
      setTipos((prev) => [...prev, novoItem]);
      updateData("idTipo", novoItem.idTipo);
    } else if (entidade === "modelo") {
      setModelos((prev) => [...prev, novoItem]);
      updateData("idModelo", novoItem.idModelo);
    }

    setModalAberto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const camposObrigatorios = [
      "idCalcado",
      "idMarca",
      "idTipo",
      "idModelo",
      "corCalcado",
      "tamanhoCalcado",
      "precoSapato",
      "quantidadeEmStoque",
      "genero",
    ];

    const formValido =
      camposObrigatorios.every((campo) => {
        const value = data[campo];
        return value !== undefined && value !== null && value !== "";
      }) && foto;

    if (!formValido) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        ...data,
        dataFabricacao: new Date().toISOString().split("T")[0],
      })
    );
    formData.append("fotoFile", foto);

    try {
      const res = await fetch(`${API_BASE}/cadastrarCalcados.php`, {
        method: "POST",
        body: formData, // sem headers!
      });

      const result = await res.json();
      if (res.ok) {
        alert("Calçado cadastrado com sucesso! ID: " + result.idCalcado);
      } else {
        alert("Erro: " + result.error);
      }
    } catch (error) {
      alert("Erro inesperado ao cadastrar calçado.");
      console.error(error);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.form}>
        <h2 className={styles.title}>Carregando dados...</h2>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <header className={styles.formHeader}>
          <h2 className={styles.title}>
            <FeetStyle className={styles.meuIcone} size={80} /> Cadastro de
            Calçado
          </h2>
        </header>

        <div className={styles.contentWrapper}>
          <div className={styles.imagemContainer}>
            <ImagemViewerInput
              imageUrl={fotoPreview}
              onImageChange={handleImageChange}
              label="Foto do Calçado (Obrigatório)"
            />
          </div>

          <div className={styles.formGridContainer}>
            <div className={styles.formGrid}>
              {/* Marca */}
              <SelectWithAdd
                label="Marca"
                name="idMarca"
                value={String(data.idMarca || "")}
                onChange={handleChange}
                options={marcas}
                optionLabel="nomeMarca"
                optionValue="idMarca"
                onAdd={() => setModalAberto("marca")}
              />

              {/* Tipo */}
              <SelectWithAdd
                label="Tipo"
                name="idTipo"
                value={String(data.idTipo || "")}
                onChange={handleChange}
                options={tipos}
                optionLabel="nomeTipo"
                optionValue="idTipo"
                onAdd={() => setModalAberto("tipo")}
              />

              {/* Modelo */}
              <SelectWithAdd
                label="Modelo"
                name="idModelo"
                value={String(data.idModelo || "")}
                onChange={handleChange}
                options={modelos.filter(
                  (mod) => String(mod.idTipos) === String(data.idTipo)
                )}
                optionLabel="nomeModelo"
                optionValue="idModelo"
                onAdd={() => setModalAberto("modelo")}
                disabled={!data.idTipo}
              />

              {/* Gênero */}
              <SelectWithAdd
                label="Gênero"
                name="genero"
                value={data.genero || ""}
                onChange={handleChange}
                options={[
                  { id: "M", nome: "Masculino" },
                  { id: "F", nome: "Feminino" },
                  { id: "U", nome: "Unissex" },
                ]}
                optionLabel="nome"
                optionValue="id"
              />

              {/* Cor */}
              <InputField
                label="Cor do Calçado:"
                name="corCalcado"
                value={data.corCalcado}
                onChange={handleChange}
                placeholder="Ex: Vermelho, Preto..."
              />

              {/* Tamanho */}
              <InputField
                label="Tamanho"
                name="tamanhoCalcado"
                value={data.tamanhoCalcado}
                onChange={handleChange}
              />

              {/* Preço */}
              <InputField
                label="Preço (R$)"
                name="precoSapato"
                type="number"
                value={data.precoSapato}
                onChange={handleChange}
              />

              {/* Quantidade */}
              <InputField
                label="Quantidade em Estoque"
                name="quantidadeEmStoque"
                type="number"
                value={data.quantidadeEmStoque}
                onChange={handleChange}
              />

              {/* ID do Calçado */}
              <InputField
                label="ID do Calçado"
                name="idCalcado"
                value={data.idCalcado}
                onChange={handleChange}
                placeholder="Digite o ID"
              />

              {/* --- BOTÃO SALVAR --- */}
              <button type="submit" className={styles.buttonSubmitGrid}>
                Salvar Calçado
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* --- Modais de Cadastro --- */}
      {modalAberto === "marca" && (
        <ModalCreate
          title="Cadastrar Nova Marca"
          onClose={() => setModalAberto(null)}
          onSave={(dados) => handleNovoCadastro("marca", dados)}
          campos={[{ name: "nomeMarca", label: "Nome da Marca", type: "text" }]}
        />
      )}
      {modalAberto === "tipo" && (
        <ModalCreate
          title="Cadastrar Novo Tipo"
          onClose={() => setModalAberto(null)}
          onSave={(dados) => handleNovoCadastro("tipo", dados)}
          campos={[
            { name: "nomeTipo", label: "Nome do Tipo", type: "text" },
            { name: "descricaoTipo", label: "Descrição", type: "textarea" },
            {
              name: "categoria",
              label: "Categoria",
              type: "select",
              options: ["Casual", "Esportivo", "Formal"],
            },
          ]}
        />
      )}
      {modalAberto === "modelo" && (
        <ModalCreate
          title="Cadastrar Novo Modelo"
          onClose={() => setModalAberto(null)}
          onSave={(dados) => handleNovoCadastro("modelo", dados)}
          campos={[
            { name: "nomeModelo", label: "Nome do Modelo", type: "text" },
            {
              name: "anoLancamento",
              label: "Ano de Lançamento",
              type: "date",
            },
            { name: "anoModelo", label: "Ano do Modelo", type: "date" },
            {
              name: "idTipos",
              label: "Tipo Associado (Apenas Leitura)",
              type: "text",
              readOnly: true,
              defaultValue: data.idTipo || "",
            },
          ]}
          infoAdicional={`Tipo selecionado: ${
            tipos.find((t) => String(t.idTipo) === String(data.idTipo))
              ?.nomeTipo || "Nenhum"
          }`}
        />
      )}
    </>
  );
}

export default CadastroCalcado;
