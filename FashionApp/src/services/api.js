// services/api.js
import axios from 'axios';
import { API_URL } from '../constants/api';

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const message = error.response?.data?.message || 'Something went wrong';
        return Promise.reject(new Error(message));
    }
);

api.interceptors.request.use(
    (config) => {
        // Add any custom headers or authentication tokens here
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default api;