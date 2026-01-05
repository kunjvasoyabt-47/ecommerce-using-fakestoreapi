import axios from 'axios';

// Base URL configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. Register User 
export const registerUser = (userData) => {
  // FakeStoreAPI expects a specific structure to simulate a real user creation
  const payload = {
    email: userData.email,
    username: userData.username,
    password: userData.password,
  };
  
  return api.post('/users', payload);
};

// 2. Login User
export const loginUser = (credentials) => {
  // Credentials must be { username: '...', password: '...' }
  return api.post('/auth/login', credentials);
};

// 3. Get Products (Helper)
export const getAllProducts = () => api.get('/products');

export default api;