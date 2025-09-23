import axios from "axios";
import { useAuthStore } from "../store/authStore.js";

const api = axios.create({
    baseURL: 'https://oversin-backend.onrender.com',
});

api.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token;
        if(token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;