import api from './api';
import { API_ENDPOINTS } from '../constants/api';


export const getProducts = async () => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.BASE); // Không thêm page, limit nữa
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch products.';
        throw new Error(message);
    }
};



export const getProductDetail = async (productId) => {
    try {
        const response = await api.get(API_ENDPOINTS.PRODUCTS.DETAIL(productId));
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch product details.';
        throw new Error(message);
    }
}


export const searchProducts = async (query) => {
    try {
        const response = await api.get(`${API_ENDPOINTS.PRODUCTS.SEARCH}?name=${query}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to search products.';
        throw new Error(message);
    }
}


export const filterProducts = async (filters) => {
    try {
        const response = await api.post(API_ENDPOINTS.PRODUCTS.FILTER, filters);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to filter products.';
        throw new Error(message);
    }
}


export const createProduct = async (productData) => {
    try {
        const response = await api.post(API_ENDPOINTS.PRODUCTS.CREATE, productData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to create product.';
        throw new Error(message);
    }
}


export const updateProduct = async (productId, productData) => {
    try {
        const response = await api.put(API_ENDPOINTS.PRODUCTS.UPDATE(productId), productData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update product.';
        throw new Error(message);
    }
}


export const deleteProduct = async (productId) => {
    try {
        const response = await api.delete(API_ENDPOINTS.PRODUCTS.DELETE(productId));
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete product.';
        throw new Error(message);
    }
}


export const updateProductStock = async (productId, quantity) => {
    try {
        const response = await api.put(API_ENDPOINTS.PRODUCTS.UPDATE_STOCK(productId), { quantity });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update product stock.';
        throw new Error(message);
    }
}



