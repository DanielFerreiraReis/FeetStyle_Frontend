// Defina a base da API (ajuste conforme seu servidor PHP)
export const API_BASE = "http://localhost/BackEndLojaDeSapatos/src/api";

// ===============================================
// Funções de integração com backend PHP
// ===============================================

// Busca entidades do backend
export const fetchEntidades = async (endpoint) => {
  const res = await fetch(`${API_BASE}/${endpoint}.php`);
  if (!res.ok) throw new Error("Erro ao buscar " + endpoint);
  return await res.json();
};

// Cadastra nova entidade
export const cadastrarNovaEntidade = async (endpoint, novoItem) => {
  const res = await fetch(`${API_BASE}/${endpoint}.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(novoItem),
  });
  if (!res.ok) throw new Error("Erro ao cadastrar " + endpoint);
  return await res.json();
};