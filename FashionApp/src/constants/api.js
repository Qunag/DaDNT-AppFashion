const isEmulator = true;

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
