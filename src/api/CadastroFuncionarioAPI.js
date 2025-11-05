// CadastroFuncionarioAPI.js
export const cadastrarFuncionario = async (data, foto) => {
  try {
    const formData = new FormData();

    // Adiciona todos os dados do formulário
    for (const key in data) {
      formData.append(key, data[key]);
    }

    // Adiciona o arquivo da imagem, se houver
    if (foto) {
      formData.append("foto", foto);
    }

    const response = await fetch("http://localhost/backend/cadastrarFuncionario.php", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar funcionário:", error);
    throw error;
  }
};
