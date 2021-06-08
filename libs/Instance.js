import axios from "axios";
import Cookies from "js-cookie";

const Instance = axios.create({
  baseURL: process.env.API_URL,
  responseType: "json"
});

Instance.interceptors.request.use(config => {
  if (Cookies.get("token")) {
    config.headers.common.Authorization = `Bearer ${Cookies.get("token")}`;
  }

  return config;
});

export default Instance;