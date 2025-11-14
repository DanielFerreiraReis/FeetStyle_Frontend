import { Outlet } from "react-router-dom";
import styles from "../../../styles/DashboardLayout.module.css";
import SideBarNavegation from "../../../components/componentesDashbord/SideNavegationBar";

const DashboardLayout = () => {
  return (
    <div >
      <SideBarNavegation/>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;