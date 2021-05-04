import axios from 'axios';
import cookie from "../helpers/cookie";

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    responseType: "json"
});

apiClient.interceptors.request.use(config => {
    config.headers.common.Authorization = `Bearer ${cookie.get('token')}`;
    return config;
});

export default apiClient;