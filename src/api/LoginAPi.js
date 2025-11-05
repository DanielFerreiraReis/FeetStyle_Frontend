//API de Autenticação de login
export const loginUser = async (user, senha) => {
  try {
    const response = await fetch('http://localhost/BackEndLojaDeSapatos/src/api/login.php', {
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