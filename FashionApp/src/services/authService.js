// services/authService.js
import api from './api';
import { API_ENDPOINTS } from '../constants/api';

export const registerUser = async (name, email, password) => {

    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
    return response.data;
}
export const loginUser = async (email, password) => {
    try {
        console.log('Login URL:', API_ENDPOINTS.AUTH.LOGIN);
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Invalid email or password.';
        console.error('Login error:', message);
        throw new Error(message);
    }
};

export const logoutUser = async () => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT);
        return { message: 'Logged out successfully' };
    } catch (error) {
        const message = error.response?.data?.message || 'Logout failed.';
        throw new Error(message);
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to send reset link.';
        throw new Error(message);
    }
};

export const resetPassword = async (email, code, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { email, code, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to reset password.';
        throw new Error(message);
    }
}


export const sendVerificationEmail = async () => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.SEND_VERIFICATION_EMAIL);
        return response.data;
    }
    catch (error) {
        const message = error.response?.data?.message || 'Failed to send verification email.';
        throw new Error(message);
    }
}



export const verifyEmail = async (token) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to verify email.';
        throw new Error(message);
    }
}


export const refreshTokens = async (refreshToken) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.REFRESH_TOKENS, { refreshToken });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to refresh tokens.';
        throw new Error(message);
    }
};






