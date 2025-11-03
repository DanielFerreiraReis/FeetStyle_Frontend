const Relatorio = () => (
    <div>
        <button className="button" onClick={() => alert("Análise de Vendas")}>
            <h1>Análise de vendas</h1>
            <p>Veja aqui os relatórios gerados.</p>
        </button>

        <button className="button" onClick={() => alert("Análise de Colaboradores")}>
            <h1>Análise de Colaboradores</h1>
            <p>Veja aqui os colaboradores cadastrados.</p>
        </button>
    </div>
);

export default Relatorio;