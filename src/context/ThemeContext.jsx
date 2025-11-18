import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; // axios

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const localTheme = localStorage.getItem("theme") || "Dark";

  const [theme, setTheme] = useState(localTheme);

  // ---- GET do tema ----
  useEffect(() => {
    async function loadUserTheme() {
      try {
        const response = await api.get("?route=models/preferences");

        if (response.data?.theme) {
          setTheme(response.data.theme);
          localStorage.setItem("theme", response.data.theme);
        }
      } catch (err) {
        console.error("Erro ao carregar tema do usuário:", err);
      }
    }

    loadUserTheme();
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  // ---- Atualizar tema ----
  const toggleTheme = async () => {
    const newTheme = theme === "Dark" ? "Light" : "Dark";

    setTheme(newTheme);
    document.body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);

    try {
      api.put("?route=user/preferences/theme", {
        theme: newTheme,
      });
    } catch (err) {
      console.error("Erro ao salvar tema:", err);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);