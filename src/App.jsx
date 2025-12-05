import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import useBlockReload from "./utils/useBlockReload";

function App() {
  useBlockReload();

  return <AppRoutes />;
}

export default App;