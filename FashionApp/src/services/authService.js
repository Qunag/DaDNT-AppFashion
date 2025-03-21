import axios from 'axios';
import { API_ENDPOINTS } from '../constants/api';

export const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.REGISTER, { name, email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Registration failed.';
    }
};

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || 'Invalid email or password.';
    }
};

export const logoutUser = async () => {
    try {
        await axios.post(API_ENDPOINTS.AUTH.LOGOUT);
        return { message: 'Logged out successfully' };
    } catch (error) {
        throw error.response?.data?.message || 'Logout failed.';
    }
};
