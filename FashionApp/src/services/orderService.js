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

        const response = await api.get(API_ENDPOINTS.ORDERS.BASE, { headers });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error('Fetch orders error:', message);
        throw new Error(message || 'Không thể tải danh sách đơn hàng.');
    }
};

// Lấy chi tiết một đơn hàng
export const fetchOrderDetail = async (orderId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(API_ENDPOINTS.ORDERS.DETAIL(orderId), { headers });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || error.message;
        console.error('Fetch order detail error:', { message, status: error.response?.status, data: error.response?.data });
        if (error.response?.status === 403) {
            throw new Error('Bạn không có quyền truy cập chi tiết đơn hàng.');
        }
        if (error.response?.status === 401 || message.includes('token')) {
            throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
        }
        throw new Error(message || 'Không thể tải chi tiết đơn hàng.');
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

export const confirmOrder = async (orderId) => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.patch(API_ENDPOINTS.ORDERS.CONFIRM(orderId), {}, { headers });
        return response.data;
    } catch (error) {
        console.error('Error confirming order:', error.response ? error.response.data : error.message);
        throw error;
    }
};