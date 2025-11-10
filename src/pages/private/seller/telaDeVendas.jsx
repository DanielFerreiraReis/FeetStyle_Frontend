import BarraSuperior from "../../../components/paginaVendas/BarraSuperior.jsx";
import ImagemViewerOutput from "../../../UI/ImageViewerOutput.jsx";
import styles from "../../../styles/TelaVendas.module.css";
// import { SiZend } from "react-icons/si";

const TelaDeVendas = () => {
  const preview = null;
  //posterior mente usar o userState para passar valor pelo Backend (preview e setpreview);

  return (
    <div className={styles.organization}>
      <BarraSuperior />
      <div className={styles.mainContainer}>
        {/* COLUNA ESQUERDA - Imagem e Tabela */}
        <div className={styles.leftColumn}>
          <div className={styles.imageSection}>
            <ImagemViewerOutput
              imageUrl={preview || null}
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
                <tr>
                  <td>542</td>
                  <td>Sapato Social Masculino</td>
                  <td>1</td>
                  <td>R$ 99,99</td>
                  <td>R$ 199,98</td>
                </tr>
              </tbody>
            </table>
            <div className={styles.tableFooter}>
              <span>
                'Carrinho onde ficará listados todos os produtos daquela venda'
              </span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button className={styles.payButton}>PAGAMENTO</button>
            <button className={styles.deleteButton}>EXCLUIR</button>
          </div>
        </div>

        {/* COLUNA DIREITA - Formulário */}
        <div className={styles.rightColumn}>
          <div className={styles.formGrid}>
            {/* Linha 1 */}
            <div className={styles.formField}>
              <label>CÓDIGO DA VENDA</label>
              <input type="text" defaultValue="000123" disabled />
            </div>
            <div className={styles.formField}>
              <label>COR</label>
              <input type="text" />
            </div>

            {/* Linha 2 */}
            <div className={styles.formField}>
              <label>TAMANHO</label>
              <input type="text" />
            </div>
            <div className={styles.formField}>
              <label>GÊNERO</label>
              <input type="text" />
            </div>

            {/* Linha 3 */}
            <div className={styles.formField}>
              <label>VALOR UNITÁRIO R$</label>
              <input type="text" />
            </div>
            <div className={styles.formField}>
              <label>TOTAL ITEM R$</label>
              <input type="text" defaultValue="0,00" disabled />
            </div>

            {/* Linha 4 */}
            <div className={styles.formField}>
              <label>QUANTIDADE</label>
              <input type="number" defaultValue="1" />
            </div>
            <div className={styles.formField}>
              <label>UN.</label>
              <input type="text" defaultValue="UN" disabled />
            </div>

            {/* Linha 5 - Campo grande */}
            <div className={styles.formFieldFull}>
              <label>CÓDIGO DO PRODUTO</label>
              <input type="text" placeholder="Ex: 101" />
            </div>
          </div>

          <button className={styles.addCartButton}>
            ADICIONAR NO CARRINHO
          </button>
        </div>
      </div>
    </div>
  );
};

export default TelaDeVendas;
