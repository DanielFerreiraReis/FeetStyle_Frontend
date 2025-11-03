const Movimento = () => (
    <div>
        <button className="button" onClick={() => window.location.href = '../telaVendas/TeladeVendas.html'}>
            <h1>Vendas</h1>
            <p>Vendas de produtos</p>
        </button>

        <button className="button" onClick={() => alert("Funcionalidade de Preços")}>
            <h1>Preços</h1>
            <p>Consultar de preços</p>
        </button>

        <button className="button" onClick={() => alert("Funcionalidade de Histórico")}>
            <h1>Histórico</h1>
            <p>Histórico de vendas</p>
        </button>
    </div>
);

export default Movimento;