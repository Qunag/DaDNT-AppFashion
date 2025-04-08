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
export const updateCartItem = async (userId, productId, { quantity, color, size }) => {
    try {
        const cart = await Cart.findOne({ user: userId });

        // Tìm sản phẩm trong mảng items và cập nhật
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());

        if (itemIndex === -1) {
            throw new Error("Sản phẩm không tồn tại trong giỏ hàng");
        }

        cart.items[itemIndex].quantity = quantity;
        cart.items[itemIndex].color = color;
        cart.items[itemIndex].size = size;

        await cart.save();
        return cart;
    } catch (error) {
        console.error("Error updating item:", error);
        throw error;
    }

};


// Xóa một sản phẩm khỏi giỏ
export const removeFromCart = async (userId, productId) => {
    try {
        const cart = await Cart.findOne({ user: userId });

        // Tìm và xóa sản phẩm trong mảng items
        const updatedItems = cart.items.filter(item => item.productId.toString() !== productId.toString());

        // Cập nhật lại giỏ hàng
        cart.items = updatedItems;
        await cart.save();

        return cart;
    } catch (error) {
        console.error("Error removing item:", error);
        throw new Error("Not found");
    }
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
