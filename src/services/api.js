import axios from 'axios';

// Base URL configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const API_ENDPOINTS = {
  REGISTER: '/users',       
  LOGIN: '/auth/login',  
  HOME: '/',
  PRODUCTS: '/products',
  CART: '/cart',
     
};
export default api;