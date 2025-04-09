import api from './api';
import {API_ENDPOINTS} from '../constants/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAuthHeaders} from './authService';



export const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`${API_ENDPOINTS.USERS.BASE}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch users.';
        throw new Error(message);
    }
}


export const getUserById = async (userId) => {
    const headers = await getAuthHeaders();
    const response = await api.get(API_ENDPOINTS.USERS.DETAIL(userId), { headers });
    return response.data;
}

export const updateUser = async (userId, userData) => {
   const headers = await getAuthHeaders();
   const response = await api.patch(API_ENDPOINTS.USERS.DETAIL(userId), userData, { headers });
   return response.data;
}



export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(API_ENDPOINTS.USERS.DETAIL(userId));
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete user.';
        throw new Error(message);
    }
}