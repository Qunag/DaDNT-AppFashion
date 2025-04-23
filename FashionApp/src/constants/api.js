

const API_URL = "http://192.168.1.241:3000/v1";

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
    CARTS: {
        BASE: `${API_URL}/carts`,
        DETAIL: (userId) => `${API_URL}/carts/${userId}`,
        CREATE: `${API_URL}/carts`,
        ADD_ITEM: `${API_URL}/carts/add`,
        UPDATE_ITEM: (productId) => `${API_URL}/carts/item/${productId}`,
        REMOVE_ITEM: (productId) => `${API_URL}/carts/item/${productId}`,
        VALIDATE_ITEM: (productId) => `${API_URL}/carts/validate/${productId}`,
    },
    ORDERS: {
        BASE: `${API_URL}/orders`,
        DETAIL: (orderId) => `${API_URL}/orders/${orderId}`,
        CREATE: `${API_URL}/orders/create`,
        UPDATE_STATUS: (orderId) => `${API_URL}/orders/update-status/${orderId}`,
        CANCEL: (orderId) => `${API_URL}/orders/cancel/${orderId}`,
        CONFIRM: (orderId) => `${API_URL}/orders/confirm/${orderId}`,
    },
};
