import styles from "../../styles/TelaVendas.module.css";

const CarrinhoTable = ({ carrinho }) => {
  return (
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
              <td colSpan="5" style={{ textAlign: "center", padding: "10px" }}>
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
    </div>
  );
};

export default CarrinhoTable;