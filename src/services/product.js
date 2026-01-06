import api, { API_ENDPOINTS } from './api';
export const getAllProducts = () => {
  return api.get(API_ENDPOINTS.PRODUCTS);
};

export const getProductById = (id) => {
  return api.get(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};