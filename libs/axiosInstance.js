import axios from "axios";
import Cookies from "js-cookie";

const AxiosInstance = axios.create({
  baseURL: process.env.API_URL,
  responseType: "json"
});

AxiosInstance.interceptors.request.use(config => {
  if (Cookies.get("token")) {
    config.headers.common.Authorization = `Bearer ${Cookies.get("token")}`;
  }

  return config;
});

export default AxiosInstance;