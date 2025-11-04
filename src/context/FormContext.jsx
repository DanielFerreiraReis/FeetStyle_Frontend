import { createContext, useContext, useState } from "react";

// Cria o contexto
const FormContext = createContext();

// Hook para consumir o contexto
export const useFormStatus = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormStatus deve ser usado dentro de um FormProvider");
  }
  return context;
};

// Provider que envolve os componentes que precisam acessar o status
export const FormProvider = ({ children }) => {
  const [status, setStatus] = useState({});

  // Exemplo de função que marca o progresso dos passos
  const updateStatus = (stepPath, value) => {
    setStatus((prev) => ({ ...prev, [stepPath]: value }));
  };

  return (
    <FormContext.Provider value={{ status, updateStatus }}>
      {children}
    </FormContext.Provider>
  );
};
