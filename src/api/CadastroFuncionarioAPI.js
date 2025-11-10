export const cadastrarFuncionario = async (data) => {
  try {
    const formData = new FormData();

    // Adiciona todos os dados do formulário
    for (const key in data) {
      if (key === "fotoArquivo" && data[key]) {
        formData.append("foto", data[key]); // nome esperado pelo backend
      } else {
        formData.append(key, data[key]);
      }
    }

    const response = await fetch("http://127.0.0.1/backendlojadesapatos/src/api/cadastrarFuncionario.php", {
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