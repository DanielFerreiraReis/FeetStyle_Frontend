import BarraSuperior from "../../../components/paginaVendas/BarraSuperior.jsx";
import ImagemViewerOutput from "../../../UI/ImageViewerOutput.jsx";
import styles from "../../../styles/TelaVendas.module.css";
import { useState } from "react";
import { useFormStatus } from "../../../context/FormContext.jsx";

const TelaDeVendas = () => {
  const { fotoPreview, setFotoPreview } = useFormStatus();

  const [codigoProduto, setCodigoProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);

  // Buscar produto do backend
  const buscarProduto = async () => {
    if (!codigoProduto) return;

    try {
      const response = await fetch(
        `http://localhost/BackEndLojaDeSapatos/src/api/produto/buscar.php?id=${codigoProduto}`
      );

      const data = await response.json();
      console.log("Resposta completa do backend:", data);

      if (data.success) {
        console.log("Produto recebido:", data.produto);
        console.log("URL da imagem recebida:", data.produto.image);

        setProduto(data.produto);
        setFotoPreview(data.produto.image);
      } else {
        setProduto(null);
        setFotoPreview(null);
        alert("Produto não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setProduto(null);
      setFotoPreview(null);
    }
  };

  // Adicionar item ao carrinho (evita duplicados)
  const adicionarAoCarrinho = () => {
    if (!produto) {
      alert("Busque um produto primeiro!");
      return;
    }

    if (quantidade < 1) {
      alert("A quantidade mínima é 1");
      return;
    }

    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                qtd: item.qtd + quantidade,
                total: (item.qtd + quantidade) * item.valor,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: produto.id,
          descricao: produto.descricao,
          qtd: quantidade,
          valor: produto.valor_unit,
          total: produto.valor_unit * quantidade,
        },
      ];
    });
  };

  return (
    <div className={styles.organization}>
      <BarraSuperior />
      <div className={styles.mainContainer}>
        {/* Coluna esquerda */}
        <div className={styles.leftColumn}>
          <div className={styles.imageSection}>
            <ImagemViewerOutput
              imageUrl={fotoPreview}
              label="Imagem do Produto"
            />
          </div>

          <div className={styles.tableSection}>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Descrição</th>
                  <th>Qtd</th>
                  <th>Val.Unit</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {carrinho.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "10px" }}
                    >
                      Nenhum item adicionado
                    </td>
                  </tr>
                ) : (
                  carrinho.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.descricao}</td>
                      <td>{item.qtd}</td>
                      <td>R$ {item.valor.toFixed(2)}</td>
                      <td>R$ {item.total.toFixed(2)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <div className={styles.tableFooter}>
              <span>
                Carrinho: lista de todos os produtos adicionados nesta venda
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.payButton}>PAGAMENTO</button>
            <button
              className={styles.deleteButton}
              onClick={() => {
                setCarrinho([]);
                setProduto(null);
                setFotoPreview(null);
                setCodigoProduto("");
                setQuantidade(1);
              }}
            >
              EXCLUIR
            </button>
          </div>
        </div>

        {/* Coluna direita */}
        <div className={styles.rightColumn}>
          <div className={styles.formGrid}>
            <div className={styles.formField}>
              <label>CÓDIGO DA VENDA</label>
              <input type="text" defaultValue="000" disabled />
            </div>
            <div className={styles.formField}>
              <label>COR</label>
              <input type="text" value={produto?.cor || ""} disabled />
            </div>
            <div className={styles.formField}>
              <label>TAMANHO</label>
              <input type="text" value={produto?.tamanho || ""} disabled />
            </div>
            <div className={styles.formField}>
              <label>GÊNERO</label>
              <input type="text" value={produto?.genero || ""} disabled />
            </div>
            <div className={styles.formField}>
              <label>VALOR UNITÁRIO R$</label>
              <input type="text" value={produto?.valor_unit || ""} disabled />
            </div>
            <div className={styles.formField}>
              <label>TOTAL ITEM R$</label>
              <input
                type="text"
                value={
                  produto
                    ? (produto.valor_unit * quantidade).toFixed(2)
                    : "0,00"
                }
                disabled
              />
            </div>
            <div className={styles.formField}>
              <label>QUANTIDADE</label>
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(Number(e.target.value))}
              />
            </div>
            <div className={styles.formField}>
              <label>VALOR FINAL R$</label>
              <input
                type="text"
                value={
                  produto
                    ? (produto.valor_unit * quantidade).toFixed(2)
                    : "0,00"
                }
                disabled
              />
            </div>
            <div className={styles.formFieldFull}>
              <label>CÓDIGO DO PRODUTO</label>
              <input
                type="text"
                value={codigoProduto}
                onChange={(e) => setCodigoProduto(e.target.value)}
                onBlur={buscarProduto}
                onKeyDown={(e) => e.key === "Enter" && buscarProduto()}
              />
            </div>
          </div>

          <button
            className={styles.addCartButton}
            onClick={adicionarAoCarrinho}
          >
            ADICIONAR NO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelaDeVendas;
