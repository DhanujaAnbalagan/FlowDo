import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    
    // Auto logout on 401 Unauthorized
    if (response?.status === 401) {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { useAuthStore } = require('@/store/authStore');
      useAuthStore.getState().logout();
      window.location.href = '/signin';
    }

    // Log 400 errors for easier debugging
    if (response?.status === 400) {
      console.error('Bad Request API Error:', response.data?.error || response.data);
    }

    const message = response?.data?.error?.message || error.message || 'Something went wrong';
    return Promise.reject({ ...error, message });
  }
);

export default api;
