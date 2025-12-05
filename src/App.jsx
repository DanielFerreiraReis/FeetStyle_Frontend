import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import useBlockReload from "./utils/useBlockReload";
import { AuthProvider } from "./context/AuthContext.jsx";
import { FormProvider } from "./context/FormContext.jsx";

function App() {
  useBlockReload();

  return (
    <AuthProvider>
      <FormProvider>
        <AppRoutes />
      </FormProvider>
    </AuthProvider>
  );
}

export default App;
