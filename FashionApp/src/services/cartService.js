import api from './api';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../constants/api';
import { getUserID, getRefreshToken } from './authService';

// Lấy headers có access token
const getAuthHeaders = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) throw new Error('No access token found.');
    return { Authorization: `Bearer ${accessToken}` };
};

// Lấy giỏ hàng hiện tại của user
export const fetchCart = async () => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.CARTS.DETAIL(userId), { headers });
    return response.data;
};

// Tạo mới giỏ hàng cho user
export const createCart = async (userId) => {
    const headers = await getAuthHeaders();
    const response = await axios.post(API_ENDPOINTS.CARTS.CREATE, { userId }, { headers });
    return response.data;
};

// Tạo giỏ hàng nếu chưa tồn tại
export const createCartIfNotExists = async () => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    try {
        const response = await api.get(API_ENDPOINTS.CARTS.DETAIL(userId), { headers });
        return response.data;
    } catch (error) {
        // Nếu chưa có cart thì tạo mới
        const createResponse = await axios.post(API_ENDPOINTS.CARTS.CREATE, { userId }, { headers });
        return createResponse.data;
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (userId, productId) => {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
        console.error("No refresh token found");
        return; // Handle the missing token scenario
    }

    try {
        const response = await fetch(`${API_URL}/v1/carts/${userId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${refreshToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                productId,
                quantity: 1,
            }),
        });
        if (response.ok) {
            console.log("Item added to cart");
        } else {
            console.error("Failed to add item to cart");
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
    }
};



// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (productId) => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.DELETE_ITEM(userId), {
        headers,
        data: { productId },
    });
    return response.data;
};

// Cập nhật số lượng sản phẩm trong giỏ hàng
export const updateCartItem = async (productId, quantity) => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.put(API_ENDPOINTS.CARTS.UPDATE_ITEM(userId), {
        productId,
        quantity,
    }, { headers });
    return response.data;
};

// Xóa toàn bộ giỏ hàng (hoặc xóa tất cả items)
export const clearCart = async () => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.DETAIL(userId), { headers });
    return response.data;
};

// Đặt hàng (checkout)
export const checkout = async (orderDetails) => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.post(API_ENDPOINTS.ORDERS.BASE, { userId, ...orderDetails }, { headers });
    return response.data;
};

// Lấy danh sách sản phẩm trong giỏ hàng
export const getCartItems = async () => {
    const userId = await getUserID();
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.CARTS.DETAIL(userId), { headers });
    return response.data.items;
};
