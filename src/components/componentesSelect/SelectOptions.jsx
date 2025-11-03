// import Inicio from "../components/Inicio";
// import Cadastro from "./components/Cadastro";
// import Movimento from "./components/Movimento";
// import Relatorio from "./components/Relatorio";
// import SideBar from "./SideBar";

const SelectOpitions = () => {
    const [page, setPage] = React.useState('Inicio');

    const renderContent = () => {
        switch(page) {
            case "inicio": return <Inicio />;
            case "movimento": return <Movimento />;
            case "cadastro": return <Cadastro />;
            case "relatorio": return <Relatorio />;
            default: return <Inicio />;
        }
    };

    return (
            <main style={{ flex: 1 }}>
                {renderContent()}
            </main>
    );
};

export default SelectOpitions;