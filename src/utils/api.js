import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin';
    }
    return Promise.reject(error);
  }
);

// API functions
export const blogAPI = {
  getAllPosts: (params) => api.get('/blog', { params }),
  getPost: (id) => api.get(`/blog/${id}`),
  createPost: (data) => api.post('/blog', data),
  updatePost: (id, data) => api.put(`/blog/${id}`, data),
  deletePost: (id) => api.delete(`/blog/${id}`),
  getAdminPosts: () => api.get('/blog/admin/all'),
};

export const volumeAPI = {
  getAllVolumes: (params) => api.get('/volumes', { params }),
  getVolume: (id) => api.get(`/volumes/${id}`),
  createVolume: (data) => api.post('/volumes', data),
  updateVolume: (id, data) => api.put(`/volumes/${id}`, data),
  deleteVolume: (id) => api.delete(`/volumes/${id}`),
  trackDownload: (id) => api.post(`/volumes/${id}/download`),
  getAdminVolumes: () => api.get('/volumes/admin/all'),
};

export const prayerAPI = {
  submitRequest: (data) => api.post('/prayers', data),
  getAllRequests: (params) => api.get('/prayers', { params }),
  getRequest: (id) => api.get(`/prayers/${id}`),
  updateStatus: (id, data) => api.put(`/prayers/${id}/status`, data),
  deleteRequest: (id) => api.delete(`/prayers/${id}`),
  getStats: () => api.get('/prayers/admin/stats'),
};

export const contactAPI = {
  submitForm: (data) => api.post('/contact', data),
};

export const subscriberAPI = {
  subscribe: (data) => api.post('/subscribers/subscribe', data),
  unsubscribe: (data) => api.post('/subscribers/unsubscribe', data),
  getAll: (params) => api.get('/subscribers', { params }),
  getStats: () => api.get('/subscribers/stats'),
  sendNewsletter: (data) => api.post('/subscribers/send-newsletter', data),
};

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  verify: () => api.get('/auth/verify'),
};

export default api;