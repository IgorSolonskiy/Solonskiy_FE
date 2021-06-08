import apiClient from "../libs/apiClient";

const search = async (username, page = 1, limit = 6) => {
  const { data: response } = await apiClient.get(
    `users?username=${username}&limit=${limit}&page=${page}`);

  return response.data;
};

export default {
  search
}