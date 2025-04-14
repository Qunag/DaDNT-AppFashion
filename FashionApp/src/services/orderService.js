import api from './api';
import { API_ENDPOINTS } from '../constants/api';
import { getAuthHeaders } from './authService';

// Tạo đơn hàng mới
export const createOrder = async (items) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.post(API_ENDPOINTS.ORDERS.CREATE, { items }, { headers });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Lấy danh sách đơn hàng của người dùng
export const fetchOrders = async (userId) => {
    try {
        const headers = await getAuthHeaders();
        console.log('Fetching orders with headers:', headers);
        // Nếu API yêu cầu userId, thêm vào query hoặc endpoint
        const endpoint = userId
            ? `${API_ENDPOINTS.ORDERS.BASE}?userId=${userId}` // Hoặc `${API_URL}/users/${userId}/orders`
            : API_ENDPOINTS.ORDERS.BASE;
        const response = await api.get(endpoint, { headers });
        return response.data;
    } catch (error) {
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền truy cập danh sách đơn hàng.');
        }
        if (error.message.includes('token')) {
            throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        }
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Lấy chi tiết một đơn hàng
export const fetchOrderDetail = async (orderId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(API_ENDPOINTS.ORDERS.DETAIL(orderId), { headers });
        return response.data;
    } catch (error) {
        console.error('Error fetching order detail:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Cập nhật trạng thái đơn hàng (dành cho admin)
export const updateOrderStatus = async (orderId, status) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.patch(
            API_ENDPOINTS.ORDERS.UPDATE_STATUS(orderId),
            { status },
            { headers }
        );
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Hủy đơn hàng
export const cancelOrder = async (orderId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.patch(API_ENDPOINTS.ORDERS.CANCEL(orderId), {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error cancelling order:', error.response ? error.response.data : error.message);
        throw error;
    }
};