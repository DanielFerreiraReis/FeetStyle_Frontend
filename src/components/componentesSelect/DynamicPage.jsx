import SideBar from "./SideBar";
import SelectOpitions from "./SelectOptions";

const DynamicPage = () => {
    return(
        <div className="app-container" style={{ display: "flex" }}>
            <SideBar setPage={setPage} />
            <SelectOpitions/>
        </div>
    );
}

export default DynamicPage