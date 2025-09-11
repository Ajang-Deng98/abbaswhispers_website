import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

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
    // Handle network errors gracefully - return mock data
    if (!error.response || error.code === 'NETWORK_ERROR' || error.code === 'ERR_NETWORK') {
      console.warn('Network error - returning fallback data');
      return Promise.resolve({ data: [] });
    }
    
    if (error.response?.status === 401 && window.location.pathname.includes('/admin')) {
      localStorage.removeItem('adminToken');
      if (window.location.pathname !== '/admin') {
        window.location.href = '/admin';
      }
    }
    
    // For other errors, return empty data instead of rejecting
    console.warn('API Error - returning fallback data:', error.response?.status);
    return Promise.resolve({ data: [] });
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
  subscribe: (data) => api.post('/subscribers/subscribe/', data),
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