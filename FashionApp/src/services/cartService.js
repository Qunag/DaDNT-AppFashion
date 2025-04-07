import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../constants/api';

// Lấy headers có access token
const getAuthHeaders = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) throw new Error('No access token found.');
    return { Authorization: `Bearer ${accessToken}` };
};

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
export const addToCart = async (productId, quantity = 1, color, size) => {
    const headers = await getAuthHeaders();
    const response = await api.post(
        API_ENDPOINTS.CARTS.ADD_ITEM,
        { productId, quantity, color, size },
        { headers }
    );
    return response.data;
};

// Cập nhật số lượng sản phẩm trong giỏ
export const updateCartItem = async (productId, quantity) => {
    const headers = await getAuthHeaders();
    const response = await api.patch(
        API_ENDPOINTS.CARTS.UPDATE_ITEM(productId),
        { quantity },
        { headers }
    );
    return response.data;
};

// Xóa một sản phẩm khỏi giỏ
export const removeFromCart = async (productId) => {
    const headers = await getAuthHeaders();
    const response = await api.delete(API_ENDPOINTS.CARTS.DELETE_ITEM(productId), { headers });
    return response.data;
};

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
