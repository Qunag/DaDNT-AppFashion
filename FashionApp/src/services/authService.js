// services/authService.js
import api from './api';
import { API_ENDPOINTS } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = async (email, password) => {
    try {
        console.log('Login URL:', API_ENDPOINTS.AUTH.LOGIN);
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });

        console.log('Login response:', response.data); // Log để kiểm tra

        const { access, refresh, user } = response.data;
        const accessToken = access?.token;
        const refreshToken = refresh?.token;

        if (accessToken) {
            await AsyncStorage.setItem('accessToken', accessToken);
            console.log('Stored accessToken:', accessToken);
        }
        if (refreshToken) {
            await AsyncStorage.setItem('refreshToken', refreshToken);
            console.log('Stored refreshToken:', refreshToken);
        } else {
            console.warn('No refreshToken in response');
        }

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Invalid email or password.';
        console.error('Login error:', message);
        throw new Error(message);
    }
};
export const registerUser = async (name, email, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Registration failed.';
        throw new Error(message);
    }
};
export const logoutUser = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        console.log('Retrieved refreshToken:', refreshToken); // Log để kiểm tra

        if (!refreshToken) {
            throw new Error('No refresh token found. Please log in again.');
        }

        await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });

        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');

        return { message: 'Logged out successfully' };
    } catch (error) {
        const message = error.response?.data?.message || 'Logout failed.';
        console.error('Logout error:', error.response || error);
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






