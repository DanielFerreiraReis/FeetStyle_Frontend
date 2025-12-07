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
    if (foto) {
      formData.append("fotoFile", foto);
    }

    const API = `${API_BASE}cadastrarcalcado`;
    console.log(`Chamando: ${API}`);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
          "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
        },
        body: formData, // não defina Content-Type manualmente com FormData
      });

      let data;
      try {
        // usa clone para permitir fallback caso não seja JSON
        data = await res.clone().json();
      } catch {
        const text = await res.text();
        throw new Error("Resposta não é JSON: " + text);
      }

      if (res.ok) {
        alert("Calçado cadastrado com sucesso! ID: " + data.idCalcado);
      } else {
        alert("Erro: " + (data.error || "Falha desconhecida"));
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
            <FeetStyle className={styles.meuIcone} size={80} />
            Cadastro de Calçado
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
              <SelectWithAdd
                label="Cor do calçado:"
                name="corCalcado"
                value={data.corCalcado || ""}
                onChange={handleChange}
                options={[
                  { id: "C1", cor: "Preto" },
                  { id: "C2", cor: "Branco" },
                  { id: "C3", cor: "Nude/Bege" },
                  { id: "C4", cor: "Marrom" },
                  { id: "C5", cor: "Caramelo" },
                  { id: "C6", cor: "Chocolate" },
                  { id: "C7", cor: "Cinza" },
                  { id: "C8", cor: "Off-White" },
                  { id: "C9", cor: "Vermelho" },
                  { id: "C10", cor: "Bordô/Vinho" },
                  { id: "C11", cor: "Azul Marinho" },
                  { id: "C12", cor: "Prata" },
                  { id: "C13", cor: "Dourado" },
                ]}
                optionLabel="cor"
                optionValue="id"
              />

              {/* Tamanho */}
              <SelectWithAdd
                label="Tamanho:"
                name="tamanhoCalcado"
                value={data.tamanhoCalcado || ""}
                onChange={handleChange}
                options={[
                  { id: "T13", tamanho: 13 },
                  { id: "T14", tamanho: 14 },
                  { id: "T15", tamanho: 15 },
                  { id: "T16", tamanho: 16 },
                  { id: "T17", tamanho: 17 },
                  { id: "T18", tamanho: 18 },
                  { id: "T19", tamanho: 19 },
                  { id: "T20", tamanho: 20 },
                  { id: "T21", tamanho: 21 },
                  { id: "T22", tamanho: 22 },
                  { id: "T23", tamanho: 23 },
                  { id: "T24", tamanho: 24 },
                  { id: "T25", tamanho: 25 },
                  { id: "T26", tamanho: 26 },
                  { id: "T27", tamanho: 27 },
                  { id: "T28", tamanho: 28 },
                  { id: "T29", tamanho: 29 },
                  { id: "T30", tamanho: 30 },
                  { id: "T31", tamanho: 31 },
                  { id: "T32", tamanho: 32 },
                  { id: "T33", tamanho: 33 },
                  { id: "T34", tamanho: 34 },
                  { id: "T35", tamanho: 35 },
                  { id: "T36", tamanho: 36 },
                  { id: "T37", tamanho: 37 },
                  { id: "T38", tamanho: 38 },
                  { id: "T39", tamanho: 39 },
                  { id: "T40", tamanho: 40 },
                  { id: "T41", tamanho: 41 },
                  { id: "T42", tamanho: 42 },
                  { id: "T43", tamanho: 43 },
                  { id: "T44", tamanho: 44 },
                  { id: "T45", tamanho: 45 },
                  { id: "T46", tamanho: 46 },
                  { id: "T47", tamanho: 47 },
                  { id: "T48", tamanho: 48 },
                  { id: "T49", tamanho: 49 },
                  { id: "T50", tamanho: 50 },
                ]}
                optionLabel="tamanho"
                optionValue="id"
              />

              {/* Preço */}
              <InputField
                label="Preço (R$)"
                name="precoSapato"
                type="number"
                value={data.precoSapato || ""}
                onChange={handleChange}
              />

              {/* Quantidade */}
              <InputField
                label="Quantidade em Estoque"
                name="quantidadeEmStoque"
                type="number"
                value={data.quantidadeEmStoque || ""}
                onChange={handleChange}
              />

              {/* ID do Calçado */}
              <InputField
                label="ID do Calçado"
                name="idCalcado"
                value={data.idCalcado || ""}
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
