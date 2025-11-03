const Cadastro = () => (
    <div>
        <button className="button" onClick={() => window.location.href = '../cadastroProduto/cadastroProdutos.html'}>
            <h1>Cadastro de Calçados</h1>
            <p>Cadastre os calçados</p>
        </button>

        <button className="button" onClick={() => window.location.href = '../CadatroFuncionarios/cadastroFuncionarios.html'}>
            <h1>Cadastro de Funcionários</h1>
            <p>Cadastre os funcionários</p>
        </button>
    </div>
);

export default Cadastro;
