import axios from "axios";

export const apiAnova = axios.create({
  baseURL: "http://127.0.0.1:8000", // tu API FastAPI
  withCredentials: true,
});

// Add token to requests if it exists
apiAnova.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
apiAnova.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("access_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
