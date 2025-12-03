import { createContext, useState, useContext } from "react";

const LayoutContext = createContext();

export function LayoutProvider({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  return (
    <LayoutContext.Provider value={{ collapsed, setCollapsed, toggleSidebar }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}