//API de Autenticação de login
export const loginUser = async (user, senha) => {
  try {
    const response = await fetch('http://localhost/BackEndLojaDeSapatos/index.php/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, senha }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    return { success: false, message: 'Erro de conexão com o servidor' };
  }
};

//API para verificação do funcionário
export async function verifyFuncionario(payload) {
  const form = new FormData();
  form.append("id", payload.id.trim());
  form.append("nome", payload.nome.trim().toLowerCase()); // ou toUpperCase()
  form.append("cpf", payload.cpf.replace(/\D/g, "")); // só números

  const res = await fetch("http://localhost/BackEndLojaDeSapatos/index.php/login/verificar-funcionario", {
    method: "POST",
    headers: {
      "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
    },
    body: form,
  });

  return await res.json();
}

//API para cadastrar um login
export async function createLogin(payload) {
  const form = new FormData();
  form.append("idFuncionario", payload.idFuncionario);
  form.append("userLog", payload.userLog);
  form.append("password", payload.password);

  const res = await fetch("http://localhost/BackEndLojaDeSapatos/index.php/login/cadastrar-login", {
    method: "POST",
    headers: {
      "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
    },
    body: form,
  });

  return await res.json();
};