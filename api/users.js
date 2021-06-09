import apiClient from "../libs/apiClient";
import Cookies from "js-cookie";

const search = async (username, page = 1, limit = 6) => {
  const {data: response} = await apiClient.get(
      `users?username=${username}&limit=${limit}&page=${page}`);

  return response.data;
};

export const login = async user => {
  const {data: {token: response}} = await apiClient.post("login", user);

  Cookies.set("token", response);
};

export const register = async (user) => {
  const {data: {token: response}} = await apiClient.post("register", user);

  await Cookies.set("token", response);
};

export const logout = async () => {
  await apiClient.get("logout");
  Cookies.remove("token");
};

export default {
  search,
  login,
  register,
  logout,
};