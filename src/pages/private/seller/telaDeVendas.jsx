import React, { useState, useEffect } from "react";
import BarraSuperior from "../../../components/paginaVendas/BarraSuperior.jsx";
import ImagemViewerOutput from "../../../UI/ImageViewerOutput.jsx";
import CarrinhoTable from "../../../components/paginaVendas/carrinhoTable.jsx";
import VendaForm from "../../../components/paginaVendas/VendaForm.jsx";
import PagamentoModal from "../../../components/paginaVendas/PagamentoModal.jsx";
import styles from "../../../styles/TelaVendas.module.css";
import { useFormStatus } from "../../../context/FormContext.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const TelaDeVendas = () => {
  const { fotoPreview, setFotoPreview } = useFormStatus();
  const { logout, user } = useAuth(); // supondo que o contexto de auth traga o usuário logado

  const [codigoProduto, setCodigoProduto] = useState("");
  const [produto, setProduto] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [codigoVenda, setCodigoVenda] = useState("");
  const [mensagemProduto, setMensagemProduto] = useState("Busque um produto");
  const [showPagamento, setShowPagamento] = useState(false);

  // Gerar código da venda
  const gerarCodigoVenda = async () => {
    try {
      const response = await fetch(
        "http://localhost/BackEndLojaDeSapatos/src/api/produto/gerarCodigoVenda.php"
      );
      const data = await response.json();
      if (data.success) {
        setCodigoVenda(data.idVenda);
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

  // Calcular total
  const calcularTotalCompra = () =>
    carrinho.reduce((acc, item) => acc + item.total, 0);

  // Finalizar venda (agora envia para o backend)
  const finalizarVenda = async (metodoPagamento) => {
    try {
      const response = await fetch(
        "http://localhost/BackEndLojaDeSapatos/src/api/produto/salvar.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idVenda: codigoVenda,
            dataVenda: new Date().toISOString().split("T")[0],
            idFuncionario: user?.id || 1, // pega do contexto de login ou usa 1 como fallback
            metodoPagamento,
            valorTotal: calcularTotalCompra(),
            itens: carrinho.map((item) => ({
              idCalcado: item.id,
              quantidade: item.qtd,
              valorUnitario: item.valor,
              totalItem: item.total,
            })),
          }),
        }
      );

      const data = await response.json();
      console.log("Resposta do backend:", data);

      if (data.success) {
        setMensagemProduto("Venda registrada com sucesso!");
        setCarrinho([]);
        setProduto(null);
        setFotoPreview(null);
        setCodigoProduto("");
        setQuantidade(1);
        gerarCodigoVenda();
        setShowPagamento(false);
      } else {
        setMensagemProduto(data.message || "Erro ao registrar venda!");
      }
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      setMensagemProduto("Erro de conexão com o servidor!");
    }
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

          <div className={styles.buttonsRow}>
            <button
              className={`${styles.actionButton} ${styles.addButton}`}
              onClick={adicionarAoCarrinho}
            >
              Adicionar no Carrinho
            </button>

            <button
              className={`${styles.actionButton} ${styles.payButton}`}
              onClick={() => setShowPagamento(true)}
            >
              Pagamento
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
              Excluir
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento */}
      {showPagamento && (
        <PagamentoModal
          onClose={() => setShowPagamento(false)}
          onFinalizar={finalizarVenda}
          carrinho={carrinho}
          total={calcularTotalCompra()}
        />
      )}
    </div>
  );
};

export default TelaDeVendas;