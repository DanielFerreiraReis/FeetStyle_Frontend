import { createContext, useContext, useState } from "react";

// Cria o contexto
const FormContext = createContext();

// Hook personalizado para usar o contexto
export const useFormStatus = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormStatus deve ser usado dentro de um FormProvider");
  }
  return context;
};

// Provider que engloba o formulário
export const FormProvider = ({ children }) => {
  // Armazena todos os dados dos formulários
  const [data, setData] = useState({});

  // Armazena o status (se cada etapa está válida ou não)
  const [status, setStatus] = useState({});

  // 🔹 Agora também armazena imagem e preview globalmente
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  // Atualiza o campo de dados
  const updateData = (field, value) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Atualiza o status de uma etapa
  const updateStatus = (step, isValid) => {
    setStatus((prev) => ({
      ...prev,
      [step]: isValid,
    }));
  };

  // Verifica se todos os campos obrigatórios de uma etapa estão preenchidos
  const isStepValid = (fields) => {
    return fields.every((field) => {
      const value = field === "foto" ? foto : data[field];
      return value !== null && value !== undefined && value !== "";
    });
  };

  // Verifica se todas as etapas estão válidas
  const isFormValid = (steps) => {
    return steps.every((step) => status[step]);
  };

  return (
    <FormContext.Provider
      value={{
        data,
        updateData,
        status,
        updateStatus,
        isStepValid,
        isFormValid,
        foto,
        setFoto,
        fotoPreview,
        setFotoPreview,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
