import axios from 'axios';

const token = import.meta.env.VITE_API_TOKEN

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
