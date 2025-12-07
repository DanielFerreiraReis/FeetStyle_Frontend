// Defina a base da API (ajuste conforme seu servidor PHP)
export const API_BASE = "http://localhost/BackEndLojaDeSapatos/index.php/admin/";

// ===============================================
// Funções de integração com backend PHP
// ===============================================

// Busca entidades do backend
export const fetchEntidades = async (endpoint) => {
  console.log("Chamando:" + `${API_BASE}${endpoint}`);
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
      "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
    },
  });
  if (!res.ok) throw new Error("Erro ao buscar " + endpoint);
  return await res.json();
};

// Cadastra nova entidade
export const cadastrarNovaEntidade = async (endpoint, novoItem) => {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token") || ""}`,
      "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
    },
    body: JSON.stringify(novoItem),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar " + endpoint);
  return await res.json();
};
