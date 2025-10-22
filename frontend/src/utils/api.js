import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Debug logging for deployment
console.log('API_BASE_URL:', API_BASE_URL);
console.log('Environment:', import.meta.env.MODE);

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
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
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
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      message: error.message,
      code: error.code,
      response: error.response?.status,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      data: error.response?.data
    });
    
    if (error.response?.status === 401 && window.location.pathname.includes('/admin')) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
    }
    
    return Promise.reject(error);
  }
);

// API functions - Updated for Django REST Framework
export const blogAPI = {
  getAllPosts: (params) => api.get('/blog/', { params }),
  getPost: (id) => api.get(`/blog/${id}/`),
  createPost: (data) => api.post('/blog/', data),
  updatePost: (id, data) => api.put(`/blog/${id}/`, data),
  deletePost: (id) => api.delete(`/blog/${id}/`),
  getAdminPosts: () => api.get('/blog/'),
};

export const volumeAPI = {
  getAllVolumes: (params) => api.get('/volumes/', { params }),
  getVolume: (id) => api.get(`/volumes/${id}/`),
  createVolume: (data) => api.post('/volumes/', data),
  updateVolume: (id, data) => api.put(`/volumes/${id}/`, data),
  updateStatus: (id, data) => api.put(`/volumes/${id}/`, data),
  deleteVolume: (id) => api.delete(`/volumes/${id}/`),
  trackDownload: (id) => api.patch(`/volumes/${id}/download/`),
  getAdminVolumes: () => api.get('/volumes/'),
};

export const prayerAPI = {
  submitRequest: (data) => api.post('/prayers/', data),
  getAllRequests: (params) => api.get('/prayers/', { params }),
  getRequest: (id) => api.get(`/prayers/${id}/`),
  updateStatus: (id, data) => api.patch(`/prayers/${id}/`, data),
  deleteRequest: (id) => api.delete(`/prayers/${id}/`),
  getStats: () => api.get('/prayers/'),
};

export const contactAPI = {
  submitForm: (data) => api.post('/contact/', data),
  getAllContacts: () => api.get('/contact/'),
  deleteContact: (id) => api.delete(`/contact/${id}/`),
};

export const subscriberAPI = {
  subscribe: (data) => api.post('/subscribers/', data),
  unsubscribe: (data) => api.patch('/subscribers/', data),
  getAll: (params) => api.get('/subscribers/', { params }),
  getStats: () => api.get('/subscribers/'),
  sendNewsletter: (data) => api.post('/subscribers/', data),
};

export const authAPI = {
  login: (data) => api.post('/auth/login/', data),
  verify: () => api.get('/health/'),
};

export const commentAPI = {
  getPostComments: (postId) => api.get(`/blog/${postId}/comments/`),
  addComment: (data) => api.post('/comments/', data),
  getAllComments: () => api.get('/comments/'),
  deleteComment: (id) => api.delete(`/comments/${id}/`),
};

export const testimonialAPI = {
  getAllTestimonials: (params) => api.get('/testimonials/', { params }),
  getTestimonial: (id) => api.get(`/testimonials/${id}/`),
  createTestimonial: (data) => api.post('/testimonials/', data),
  updateTestimonial: (id, data) => api.put(`/testimonials/${id}/`, data),
  deleteTestimonial: (id) => api.delete(`/testimonials/${id}/`),
};

export const prayerTestimonialAPI = {
  getAllPrayerTestimonials: (params) => api.get('/prayer-testimonials/', { params }),
  getPrayerTestimonial: (id) => api.get(`/prayer-testimonials/${id}/`),
  createPrayerTestimonial: (data) => api.post('/prayer-testimonials/', data),
  updatePrayerTestimonial: (id, data) => api.put(`/prayer-testimonials/${id}/`, data),
  deletePrayerTestimonial: (id) => api.delete(`/prayer-testimonials/${id}/`),
};

export const bookAPI = {
  getAllBooks: (params) => api.get('/books/', { params }),
  getBook: (id) => api.get(`/books/${id}/`),
  createBook: (data) => api.post('/books/', data),
  updateBook: (id, data) => api.put(`/books/${id}/`, data),
  deleteBook: (id) => api.delete(`/books/${id}/`),
};

export default api;