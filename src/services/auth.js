import api, { API_ENDPOINTS } from './api';
// 1. Register User 
export const registerUser = (userData) => {
  // FakeStoreAPI expects a specific structure to simulate a real user creation
  const payload = {
    email: userData.email,
    username: userData.username,
    password: userData.password,
  };
  
  return api.post(API_ENDPOINTS.REGISTER, payload);
};

// 2. Login User
export const loginUser = (credentials) => {
  return api.post(API_ENDPOINTS.LOGIN, credentials);
};
