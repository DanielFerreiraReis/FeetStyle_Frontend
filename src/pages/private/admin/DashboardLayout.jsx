import { Outlet } from "react-router-dom";
import styles from "../../../styles/DashboardLayout.module.css";
import SideBarNavegation from "../../../components/componentesDashbord/SideNavegationBar";
import TopBarNavegation from "../../../components/componentesDashbord/TopBarNavegation";

// Layout harmonizado com sidebar fixa + topbar fixa

const DashboardLayout = () => {
  return (
    <div className={styles.layout}>
      {/* Sidebar fixa à esquerda */}
      <SideBarNavegation />

      <div className={styles.contentWrapper}>
        {/* Topbar fixa no topo */}
        <TopBarNavegation />

        {/* Conteúdo principal */}
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;