// services/authService.js
import api from './api';
import { API_ENDPOINTS } from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


// Lấy headers có access token
export const getAuthHeaders = async () => {
    let token = await AsyncStorage.getItem('accessToken');
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
            console.log('Token expired, refreshing...');
            const response = await api.post('/auth/refresh-token', {
                refreshToken: await AsyncStorage.getItem('refreshToken'),
            });
            token = response.data.accessToken;
            await AsyncStorage.setItem('accessToken', token);
        }
    } catch (err) {
        console.error('Token verification error:', err);
        throw new Error('Invalid or expired token');
    }
    return {
        Authorization: `Bearer ${token}`,
    };
};


export const loginUser = async (email, password) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, { email, password });
        const { tokens } = response.data;

        await AsyncStorage.setItem('accessToken', tokens.access.token);
        await AsyncStorage.setItem('refreshToken', tokens.refresh.token);


        return response.data;
    } catch (error) {
        throw error;
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

        if (!refreshToken) throw new Error('No refresh token found.');
        const response = await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
        if (response.status === 200 || response.status === 204) {

            await AsyncStorage.removeItem('accessToken');
            await AsyncStorage.removeItem('refreshToken');
            console.log('Logged out successfully');
            return { message: 'Logged out successfully' };
        } else {
            throw new Error('Logout failed with unexpected status');
        }
    } catch (error) {

        console.error('Logout error:', error);
        const message = error.response?.data?.message || error.message || 'Logout failed.';
        throw new Error(message);
    }
};

export const forgotPassword = async (email) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
        return response.data;
    } catch (error) {
        // Kiểm tra lỗi mất mạng bằng cách:
        // 1. Không có phản hồi từ server
        // 2. Có request mà không có response (thường là mất mạng)
        // 3. Hoặc lỗi có message 'Network Error'
        if (
            !error.response &&  // Không có phản hồi từ server
            (error.request || error.message === 'Network Error')
        ) {
            throw new Error('Không có kết nối mạng. Vui lòng kiểm tra kết nối Internet.');
        }

        // Nếu có response, lấy thông báo lỗi server trả về
        const message = error.response?.data?.message || 'Gửi liên kết đặt lại thất bại.';
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



export const getUserID = async () => {
    try {
        const userID = await AsyncStorage.getItem('userID'); // Giả sử bạn đã lưu userID vào AsyncStorage
        return userID; // Trả về userID
    } catch (error) {
        console.error('Lỗi khi lấy userID', error);
        throw error;
    }
};


export const sendOtp = async (email) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.SEND_OTP, { email });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to send OTP.';
        throw new Error(message);
    }
}

export const verifyOtp = async (email, otp) => {
    try {
        const response = await api.post(API_ENDPOINTS.AUTH.VERIFY_OTP, { email, otp });

        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to verify OTP.';
        throw new Error(message);
    }
}