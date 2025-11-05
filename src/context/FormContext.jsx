import { createContext, useContext, useState } from "react";

const FormContext = createContext();

export const useFormStatus = () => {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormStatus deve ser usado dentro de um FormProvider");
  return context;
};

export const FormProvider = ({ children }) => {
  const [status, setStatus] = useState({});
  const [data, setData] = useState({});

  const updateStatus = (stepPath, value) => {
    setStatus((prev) => ({ ...prev, [stepPath]: value }));
  };

  const updateData = (key, value) => {
    setData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Função genérica: checa se todos os campos de um "step" estão preenchidos
  const isStepValid = (requiredFields = []) => {
    return requiredFields.every((field) => data[field] && data[field].toString().trim() !== "");
  };

  // ✅ Função global: todos os passos obrigatórios estão completos
  const isFormValid = (steps) => {
    return steps.every((step) => status[step] === true);
  };

  return (
    <FormContext.Provider
      value={{
        status,
        updateStatus,
        data,
        updateData,
        isStepValid,
        isFormValid,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
