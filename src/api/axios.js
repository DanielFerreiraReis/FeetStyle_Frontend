import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/BackEndLojaDeSapatos",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Adiciona API Key apenas para rotas privadas (admin/vendedor)
    if (config.url.startsWith("/admin") || config.url.startsWith("/vendedor")) {
      config.headers["X-Internal-Key"] = process.env.REACT_APP_API_KEY;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;