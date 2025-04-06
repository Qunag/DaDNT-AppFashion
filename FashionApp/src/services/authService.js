// services/authService.js
import api from './api';
import { API_ENDPOINTS } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const loginUser = async (email, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
        const { access, refresh, user } = response.data;
        const accessToken = access?.token;
        const refreshToken = refresh?.token;

        if (accessToken) await AsyncStorage.setItem('accessToken', accessToken);
        if (refreshToken) await AsyncStorage.setItem('refreshToken', refreshToken); // Lưu refresh token vào AsyncStorage
        if (user?.id) await AsyncStorage.setItem('userId', user.id.toString());

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Invalid email or password.';
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
        // Retrieve refreshToken from AsyncStorage
        const refreshToken = await AsyncStorage.getItem('refreshToken');

        if (!refreshToken) throw new Error('No refresh token found.');

        // Call the logout API with the refreshToken
        const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });

        // Check the response status and handle success
        if (response.status === 200) {
            // Remove tokens from AsyncStorage after successful logout
            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            console.log('Logged out successfully');
            return { message: 'Logged out successfully' };
        } else {
            throw new Error('Logout failed with unexpected status');
        }
    } catch (error) {
        // Improved error handling to log more details
        console.error('Logout error:', error);

        // Capture the error message, whether it is from the response or generic error
        const message = error.response?.data?.message || error.message || 'Logout failed.';
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

const refreshAccessToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token found.');

        const response = await axios.post(API_ENDPOINTS.AUTH.REFRESH, { refreshToken });
        const { access } = response.data;
        await AsyncStorage.setItem('accessToken', access.token); // Cập nhật access token mới
    } catch (error) {
        throw new Error('Error refreshing access token: ' + error.message);
    }
};



export const getUserID = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
            throw new Error('User ID not found');
        }
        return userId;
    } catch (error) {
        console.error('Error getting user ID:', error.message || error);
        throw error;
    }
};



const checkIfLoggedIn = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found. Please log in again.');
    }
    return accessToken;
};


export const saveRefreshToken = async (token) => {
    try {
        await AsyncStorage.setItem('refreshToken', token);
    } catch (e) {
        console.error("Error saving refresh token: ", e);
    }
};

export const getRefreshToken = async () => {
    try {
        const token = await AsyncStorage.getItem('refreshToken');
        return token;
    } catch (e) {
        console.error("Error retrieving refresh token: ", e);
    }
};



