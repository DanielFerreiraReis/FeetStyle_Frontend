export const cadastrarCliente = async (data) => {
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

    const response = await fetch("http://127.0.0.1/BackendLojaDeSapatos/index.php/admin/cadastro", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "X-Internal-Key": import.meta.env.VITE_API_KEY || "",
      },
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erro ao cadastrar cliente:", error);
    throw error;
  }
};