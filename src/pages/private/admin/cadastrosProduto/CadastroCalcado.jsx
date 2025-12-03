import { useState, useEffect } from "react";
import { useFormStatus } from "../../../../context/FormContext";
import { useTheme } from "../../../../context/ThemeContext";
import ImagemViewerInput from "../../../../UI/ImagemViewerInput";
import ModalCreate from "../../../../UI/ModalCreate";
import styles from "../../../../styles/subRotesCss/CadastrosCalcados.module.css";

// ===============================================
// Funções de integração com backend PHP
// ===============================================

// Defina a base da API (ajuste conforme seu servidor PHP)
const API_BASE = "http://localhost/BackEndLojaDeSapatos/src/api";

// Busca entidades do backend
const fetchEntidades = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}.php`);
  if (!res.ok) throw new Error("Erro ao buscar " + endpoint);
  return await res.json();
};

// Cadastra nova entidade
const cadastrarNovaEntidade = async (endpoint, novoItem) => {
  const res = await fetch(`${API_BASE}/${endpoint}.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoItem),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar " + endpoint);
  return await res.json();
};

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
          <h2 className={styles.title}>Cadastro de Calçado 👟</h2>
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
              <div>
                <label className={styles.label}>Marca:</label>
                <div className={styles.inputGroup}>
                  <select
                    name="idMarca"
                    value={String(data.idMarca || "")}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Selecione a Marca...</option>
                    {marcas.map((m) => (
                      <option key={m.idMarca} value={String(m.idMarca)}>
                        {m.nomeMarca}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setModalAberto("marca")}
                    className={styles.buttonInline}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Tipo */}
              <div>
                <label className={styles.label}>Tipo:</label>
                <div className={styles.inputGroup}>
                  <select
                    name="idTipo"
                    value={String(data.idTipo || "")}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Selecione o Tipo...</option>
                    {tipos.map((t) => (
                      <option key={t.idTipo} value={String(t.idTipo)}>
                        {t.nomeTipo}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setModalAberto("tipo")}
                    className={styles.buttonInline}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Modelo */}
              <div>
                <label className={styles.label}>Modelo:</label>
                <div className={styles.inputGroup}>
                  <select
                    name="idModelo"
                    value={String(data.idModelo || "")}
                    onChange={handleChange}
                    className={styles.select}
                    disabled={!data.idTipo}
                  >
                    <option value="">Selecione o Modelo...</option>
                    {modelos
                      .filter(
                        (mod) => String(mod.idTipos) === String(data.idTipo)
                      )
                      .map((mod) => (
                        <option key={mod.idModelo} value={String(mod.idModelo)}>
                          {mod.nomeModelo}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setModalAberto("modelo")}
                    className={styles.buttonInline}
                    disabled={!data.idTipo}
                  >
                    ➕
                  </button>
                </div>
              </div>

              {/* Gênero */}
              <div>
                <label className={styles.label}>Gênero:</label>
                <select
                  name="genero"
                  value={data.genero || ""}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option value="">Selecione...</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                  <option value="U">Unissex</option>
                </select>
              </div>

              {/* Cor */}
              <div>
                <label className={styles.label}>Cor do Calçado:</label>
                <input
                  type="text"
                  name="corCalcado"
                  value={data.corCalcado || ""}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Ex: Vermelho, Preto..."
                />
              </div>

              {/* Tamanho */}
              <div>
                <label className={styles.label}>Tamanho (Ex: 40, 37.5):</label>
                <input
                  type="text"
                  name="tamanhoCalcado"
                  value={data.tamanhoCalcado || ""}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              {/* Preço */}
              <div>
                <label className={styles.label}>Preço (R$):</label>
                <input
                  type="number"
                  step="0.01"
                  name="precoSapato"
                  value={data.precoSapato || ""}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              {/* Quantidade */}
              <div>
                <label className={styles.label}>Quantidade em Estoque:</label>
                <input
                  type="number"
                  name="quantidadeEmStoque"
                  value={data.quantidadeEmStoque || ""}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              {/* ID do Calçado */}
              <div>
                <label className={styles.label}>ID do Calçado:</label>
                <input
                  type="text"
                  name="idCalcado"
                  value={data.idCalcado || ""}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Digite o ID do Calçado"
                />
              </div>


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
              label: "Ano de Lançamento (opcional)",
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
