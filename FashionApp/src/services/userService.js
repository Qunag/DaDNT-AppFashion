import api from './api';
import User from '../constants/api';


export const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await api.get(`${User.USERS.BASE}?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch users.';
        throw new Error(message);
    }
}

export const getUserById = async (userId) => {
    try {
        const response = await api.get(User.USERS.DETAIL(userId));
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to fetch user details.';
        throw new Error(message);
    }
}

export const updateUser = async (userId, userData) => {
    try {
        const response = await api.patch(User.USERS.DETAIL(userId), userData);
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to update user.';
        throw new Error(message);
    }
}


export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(User.USERS.DETAIL(userId));
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Failed to delete user.';
        throw new Error(message);
    }
}