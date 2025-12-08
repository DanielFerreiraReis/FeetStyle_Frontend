import { createContext, useContext, useState } from "react";

const StepContext = createContext();

export const StepProvider = ({ children }) => {
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState("");

  return (
    <StepContext.Provider value={{ steps, setSteps, currentStep, setCurrentStep }}>
      {children}
    </StepContext.Provider>
  );
};

export const useSteps = () => useContext(StepContext);