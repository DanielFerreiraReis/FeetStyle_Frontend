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

// Provider que envolve os componentes que precisam acessar o status e os dados
export const FormProvider = ({ children }) => {
  const [status, setStatus] = useState({}); // Marca etapas preenchidas
  const [data, setData] = useState({});     // Armazena todos os valores do formulário

  // Atualiza o progresso de cada etapa
  const updateStatus = (stepPath, value) => {
    setStatus(prev => ({ ...prev, [stepPath]: value }));
  };

  // Atualiza valores do formulário (inputs controlados)
  const updateData = (key, value) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <FormContext.Provider value={{ status, updateStatus, data, updateData }}>
      {children}
    </FormContext.Provider>
  );
};