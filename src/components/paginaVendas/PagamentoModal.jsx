import React, { useState } from "react";
import styles from "../../styles/TelaVendas.module.css";

const PagamentoModal = ({ onClose, onFinalizar, carrinho, total }) => {
  const [metodo, setMetodo] = useState(null);

  const opcoesPagamento = ["Pix", "Cartão", "Boleto", "Dinheiro"];

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Botão de fechar */}
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>

        {/* Título */}
        <h2 className={styles.modalTitle}>Método de Pagamento</h2>

        {/* Opções de pagamento */}
        <div className={styles.paymentOptions}>
          {opcoesPagamento.map((m) => {
            const valor = m.toLowerCase();
            return (
              <div
                key={valor}
                className={`${styles.paymentOption} ${
                  metodo === valor ? styles.selected : ""
                }`}
                onClick={() => setMetodo(valor)}
              >
                {m}
              </div>
            );
          })}
        </div>

        {/* Resumo da compra */}
        <div className={styles.resumoCompra}>
          <h3>Resumo da Compra</h3>
          <p>
            <strong>Total:</strong> R$ {total.toFixed(2)}
          </p>
          <ul>
            {carrinho.map((item) => (
              <li key={item.id}>
                {item.qtd}x {item.descricao} — R$ {item.total.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>

        {/* Botão registrar */}
        <div className={styles.modalFooter}>
          <button
            className={`${styles.actionButton} ${styles.addButton}`}
            onClick={() => onFinalizar(metodo)}
            disabled={!metodo}
          >
            Registrar Venda
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagamentoModal;