import BarraSuperior from "../../../components/paginaVendas/BarraSuperior.jsx";
import ImagemViewerOutput from "../../../UI/ImageViewerOutput.jsx";
import CarrinhoTable from "../../../components/paginaVendas/carrinhoTable.jsx";
import ActionButtons from "../../../components/paginaVendas/ActionButtons.jsx";
import VendaForm from "../../../components/paginaVendas/VendaForm.jsx";
import styles from "../../../styles/TelaVendas.module.css";
import { useState, useEffect } from "react";
import { useFormStatus } from "../../../context/FormContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const TelaDeVendas = () => {
  const { fotoPreview, setFotoPreview } = useFormStatus();
  const { logout } = useAuth();

  const [codigoProduto, setCodigoProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [codigoVenda, setCodigoVenda] = useState("");
  const [mensagemProduto, setMensagemProduto] = useState("Busque um produto");

  // Função para buscar código da venda no backend
  const gerarCodigoVenda = async () => {
    try {
      const response = await fetch(
        "http://localhost/BackEndLojaDeSapatos/src/api/produto/gerarCodigoVenda.php"
      );
      const data = await response.json();
      if (data.success) {
        setCodigoVenda(data.idVenda);
      } else {
        console.error("Erro ao gerar código da venda:", data.message);
      }
    } catch (error) {
      console.error("Erro ao gerar código da venda:", error);
    }
  };

  useEffect(() => {
    gerarCodigoVenda();
  }, []);

  // Buscar produto
  const buscarProduto = async () => {
    if (!codigoProduto) return false;

    try {
      const response = await fetch(
        `http://localhost/BackEndLojaDeSapatos/src/api/produto/buscar.php?id=${codigoProduto}`
      );
      const data = await response.json();

      if (data.success) {
        setProduto(data.produto);
        setFotoPreview(data.produto.image);
        setMensagemProduto("Produto encontrado!");
        return true;
      } else {
        setProduto(null);
        setFotoPreview(null);
        setMensagemProduto("Produto não encontrado!");
        return false;
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      setProduto(null);
      setFotoPreview(null);
      setMensagemProduto("Erro ao buscar produto!");
      return false;
    }
  };

  // Adicionar ao carrinho
  const adicionarAoCarrinho = () => {
    if (!produto) {
      setMensagemProduto("Busque um produto primeiro!");
      return;
    }
    if (quantidade < 1) {
      setMensagemProduto("A quantidade mínima é 1");
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

  // Calcular total da compra
  const calcularTotalCompra = () => {
    return carrinho.reduce((acc, item) => acc + item.total, 0);
  };

  return (
    <div className={styles.organization}>
      <BarraSuperior onVoltar={logout} />
      <div className={styles.mainContainer}>
        {/* Coluna esquerda */}
        <div className={styles.leftColumn}>
          <div className={styles.imageSection}>
            <ImagemViewerOutput
              imageUrl={fotoPreview}
              label="Imagem do Produto"
            />
          </div>

          <CarrinhoTable carrinho={carrinho} />
        </div>

        {/* Coluna direita */}
        <div className={styles.rightColumn}>
          <VendaForm
            codigoVenda={codigoVenda}
            produto={produto}
            quantidade={quantidade}
            setQuantidade={setQuantidade}
            codigoProduto={codigoProduto}
            setCodigoProduto={setCodigoProduto}
            buscarProduto={buscarProduto}
            calcularTotalCompra={calcularTotalCompra}
            mensagemProduto={mensagemProduto}
          />

          {/* Agrupando todos os botões juntos */}
          <div className={styles.buttonsRow}>
            <button
              className={`${styles.actionButton} ${styles.addButton}`}
              onClick={adicionarAoCarrinho}
            >
              ADICIONAR NO CARRINHO
            </button>

            <button
              className={`${styles.actionButton} ${styles.payButton}`}
              onClick={() => console.log("Pagamento")}
            >
              PAGAMENTO
            </button>

            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={() => {
                setCarrinho([]);
                setProduto(null);
                setFotoPreview(null);
                setCodigoProduto("");
                setQuantidade(1);
                setMensagemProduto("Busque um produto");
                gerarCodigoVenda();
              }}
            >
              EXCLUIR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelaDeVendas;
