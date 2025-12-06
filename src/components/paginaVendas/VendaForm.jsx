import styles from "../../styles/TelaVendas.module.css";

const VendaForm = ({
  codigoVenda,
  produto,
  quantidade,
  setQuantidade,
  codigoProduto,
  setCodigoProduto,
  buscarProduto,
  calcularTotalCompra,
  mensagemProduto,
}) => {
  // Agrupando mensagens de erro
  const mensagensErro = [
    "Produto não encontrado!",
    "A quantidade mínima é 1",
    "Busque um produto primeiro!",
  ];

  const tipoMensagem =
    mensagemProduto === "Produto encontrado!"
      ? styles.successBox
      : mensagensErro.includes(mensagemProduto)
      ? styles.errorBox
      : styles.neutralBox;

  // Definindo ícone
  const icone =
    mensagemProduto === "Produto encontrado!"
      ? "✔"
      : mensagensErro.includes(mensagemProduto)
      ? "✖"
      : "";

  return (
    <div className={styles.formGrid}>
      <div className={styles.formField}>
        <label>CÓDIGO DA VENDA</label>
        <input type="text" value={codigoVenda} disabled />
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
            produto ? (produto.valor_unit * quantidade).toFixed(2) : "0,00"
          }
          disabled
        />
      </div>
      <div className={styles.formField}>
        <label>QUANTIDADE</label>
        <input
          type="number"
          value={quantidade}
          min={1}
          onChange={(e) => setQuantidade(Number(e.target.value))}
        />
      </div>
      <div className={styles.formField}>
        <label>VALOR FINAL R$</label>
        <input type="text" value={calcularTotalCompra().toFixed(2)} disabled />
      </div>

      <div className={styles.formField}>
        <label>CÓDIGO DO PRODUTO</label>
        <input
          type="text"
          value={codigoProduto}
          onChange={(e) => setCodigoProduto(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarProduto()}
        />
      </div>
      <div className={styles.formField}>
        <label>STATUS DO PRODUTO</label>
        <div className={`${styles.statusBox} ${tipoMensagem}`}>
          {icone && <span>{icone}</span>}
          <span className={styles.mensagemTexto}>{mensagemProduto}</span>
        </div>
      </div>
    </div>
  );
};

export default VendaForm;
