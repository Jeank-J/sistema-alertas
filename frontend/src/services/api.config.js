import axios from 'axios';

// Usar URL relativa - nginx en el contenedor redirigirá a /api/ al backend
// En desarrollo local: http://localhost:5173/api -> nginx -> backend:5000/api
// En producción: http://172.27.25.81:5005/api -> nginx -> backend:5000/api
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para agregar token JWT a todas las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;