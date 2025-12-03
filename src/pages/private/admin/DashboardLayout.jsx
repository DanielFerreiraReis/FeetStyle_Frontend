import { Outlet } from "react-router-dom";
import styles from "../../../styles/DashboardLayout.module.css";
import SideBarNavegation from "../../../components/componentesDashbord/SideNavegationBar";
import TopBarNavegation from "../../../components/componentesDashbord/TopBarNavegation";
import { useDashboard } from "../../../context/DashboardContext";

const DashboardLayout = () => {
  const { isSidebarOpen } = useDashboard();

  return (
    <div
      className={`${styles.layout} ${
        isSidebarOpen ? styles.open : styles.closed
      }`}
    >
      <SideBarNavegation className={styles.sidebar}/>

      <div className={styles.contentWrapper}>
        <TopBarNavegation />

        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;