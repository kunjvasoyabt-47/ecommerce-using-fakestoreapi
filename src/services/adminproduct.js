import api, { API_ENDPOINTS } from './api';


export const getAdminProducts = async () => {
  return await api.get(API_ENDPOINTS.PRODUCTS);
};

export const deleteAdminProduct = async (id) => {
  return await api.delete(`${API_ENDPOINTS.PRODUCTS}/${id}`);
};

export const updateAdminProduct = async (id, productData) => {
  return await api.put(`${API_ENDPOINTS.PRODUCTS}/${id}`, {
    id: id,
    title: productData.title,
    price: parseFloat(productData.price),
    description: productData.description,
    category: productData.category,
    image: productData.image
  });
};

export const addAdminProduct = async (productData) => {
  return await api.post(API_ENDPOINTS.PRODUCTS, {
    title: productData.title,
    price: parseFloat(productData.price),
    description: productData.description,
    image: productData.image,
    category: productData.category
  });
};