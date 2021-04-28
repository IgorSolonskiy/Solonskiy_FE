import axios from 'axios';
import cookies from "next-cookies";

const Api = axios.create({
    baseURL: process.env.API_URL,
    responseType: "json"
});

Api.interceptors.request.use(function (config) {
    config.headers.common.Authorization = `Bearer ${cookies(document.cookie).jwt}`;
    return config;
});

export default Api;