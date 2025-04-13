import api from './api'; // Axios instance
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
export const fetchOrders = async () => {
    try {
        const headers = await getAuthHeaders();
        const response = await api.get(API_ENDPOINTS.ORDERS.BASE, { headers });
        return response.data;
    } catch (error) {
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