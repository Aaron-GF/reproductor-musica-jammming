import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Manejar token expirado - se podría integrar con checkTokenStatus aquí
      console.warn("Sesión expirada o token inválido detectado por API");
    }
    return Promise.reject(error);
  }
);

export default apiInstance;
