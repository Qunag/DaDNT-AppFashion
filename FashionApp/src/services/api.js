// services/api.js
import axios from 'axios';
import { API_URL } from '../constants/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Nếu không có response (mất mạng hoặc server không phản hồi)
        if (!error.response) {
            return Promise.reject(new Error('Không có kết nối mạng. Vui lòng kiểm tra kết nối Internet.'));
        }

        // Nếu có response, lấy message lỗi từ backend hoặc mặc định
        const message = error.response.data?.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
        return Promise.reject(new Error(message));
    }
);

api.interceptors.request.use(
    (config) => {
        // Thêm header hoặc token nếu cần tại đây
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
