const isEmulator = true;


const API_URL = "http://192.168.0.103:3000/v1";

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
        UPDATE: (userId) => `${API_URL}/users/${userId}`,
        DELETE: (userId) => `${API_URL}/users/${userId}`,
    },
    PRODUCTS: {
        BASE: `${API_URL}/products`,
        DETAIL: (productId) => `${API_URL}/products/${productId}`,
        SEARCH: `${API_URL}/products/search`,
        FILTER: `${API_URL}/products/filter`,
        CREATE: `${API_URL}/products/create`,
        UPDATE: (productId) => `${API_URL}/products/update/${productId}`,
        DELETE: (productId) => `${API_URL}/products/delete/${productId}`,
        UPDATE_STOCK: (productId) => `${API_URL}/products/update-stock/${productId}`,

    },
    CART: {
        // BASE: `${API_URL}/cart`,
        // ADD: `${API_URL}/cart/add`,
        // REMOVE: `${API_URL}/cart/remove`,
        // UPDATE: `${API_URL}/cart/update`,
        // CLEAR: `${API_URL}/cart/clear`,
    },
    ORDERS: {
        BASE: `${API_URL}/orders`,
        DETAIL: (orderId) => `${API_URL}/orders/${orderId}`,
        TRACKING: (trackingId) => `${API_URL}/orders/quantities/${trackingId}`,
    },
};
