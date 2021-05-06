import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    responseType: "json"
});

apiClient.interceptors.request.use(config => {
    config.headers.common.Authorization = `Bearer ${Cookies.get('token')}`;
    return config;
});

export default apiClient;