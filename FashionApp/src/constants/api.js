const isEmulator = false; // Đặt thành true khi chạy trên emulator, false trên máy thật

const API_URL = isEmulator
    ? 'http://10.0.2.2:3000/v1' // Emulator Android
    : 'http://192.168.1.100:3000/v1'; // Thay 192.168.1.x bằng IP LAN của máy tính
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: `${API_URL}/auth/register`,
        LOGIN: `${API_URL}/auth/login`,
        LOGOUT: `${API_URL}/auth/logout`,
        REFRESH_TOKENS: `${API_URL}/auth/refresh-tokens`,
        FORGOT_PASSWORD: `${API_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${API_URL}/auth/reset-password`,
        SEND_VERIFICATION_EMAIL: `${API_URL}/auth/send-verification-email`,
        VERIFY_EMAIL: `${API_URL}/auth/verify-email`,
    },
    USERS: {
        BASE: `${API_URL}/users`,
        DETAIL: (userId) => `${API_URL}/users/${userId}`,
    },
};
