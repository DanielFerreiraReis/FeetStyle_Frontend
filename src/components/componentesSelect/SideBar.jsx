const SideBar = () => {
    return(
        <aside class="sidebar">
            <div>
                <nav class="menu">
                <a id= "item" onclick="setPage('inicio')">
                    <h1 class="menu-title">Menu</h1>
                </a>
                
                <button class="stylebutton" onclick="setPage('movimento')">Movimento</button>
                <button class="stylebutton" onclick="setPage('cadastro')">Cadastro</button>
                <button class="stylebutton" onclick="setPage('relatorio')">Relatório</button>
                </nav>
            </div>
        </aside>
    );
}

export default SideBar;