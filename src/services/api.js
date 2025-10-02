import axios from "axios";

const apiAnova = axios.create({
  baseURL: "http://127.0.0.1:8000", // tu API FastAPI
});

export default apiAnova;
