import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../constants/api';
import { getAuthHeaders } from './authService';


// Lấy giỏ hàng hiện tại
export const fetchCart = async () => {
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.CARTS.BASE, { headers });
    return response.data;
};

// Tạo giỏ hàng mới
export const createCart = async () => {
    const headers = await getAuthHeaders();
    const response = await api.post(API_ENDPOINTS.CARTS.BASE, {}, { headers });
    return response.data;
};

// Tạo giỏ hàng nếu chưa có
export const createCartIfNotExists = async () => {
    try {
        return await fetchCart();
    } catch (err) {
        return await createCart();
    }
};

// Lấy thông tin một sản phẩm trong giỏ
export const getCartItem = async (productId) => {
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.CARTS.GET_ITEM(productId), { headers });
    return response.data;
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (productId, name, image_url, brand, price, quantity, color, size) => {
    const headers = await getAuthHeaders();
    const response = await api.post(
        API_ENDPOINTS.CARTS.ADD_ITEM,
        { productId, name, image_url, brand, price, quantity, color, size },
        { headers }
    );
    return response.data;
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = async (productId, { quantity, color, size }) => {
    const headers = await getAuthHeaders();
    console.log("Gọi API cập nhật sản phẩm:", productId);
    console.log("Dữ liệu gửi đi:", { quantity, color, size });

    try {
        const response = await api.patch(
            API_ENDPOINTS.CARTS.UPDATE_ITEM(productId),
            { quantity, color, size },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error("Chi tiết lỗi API:", error.response ? error.response.data : error.message);
        throw error;
    }
};
// Xóa một sản phẩm khỏi giỏ
export const remove = async (productId) => {
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.REMOVE_ITEM(productId), { headers });
    return response.data;
};

export const removeFromCart = async (productId, color, size) => {
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.REMOVE_ITEM(productId), {
        headers,
        data: { color, size },
    });
    return response.data;
}


// Xóa toàn bộ giỏ hàng
export const clearCart = async () => {
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.BASE, { headers });
    return response.data;
};

// Kiểm tra một sản phẩm có trong giỏ hay không
export const validateCartItem = async (productId) => {
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.CARTS.VALIDATE_ITEM(productId), { headers });
    return response.data;
};

// Cập nhật toàn bộ giỏ hàng
export const updateCart = async (items) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.put(API_ENDPOINTS.CARTS.BASE, { items }, { headers });
        console.log('Updated Cart:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error.response ? error.response.data : error.message);
        throw error;
    }
};