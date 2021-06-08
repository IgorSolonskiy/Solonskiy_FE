import AxiosInstance from "../libs/axiosInstance";

const search = async (username, page = 1, limit = 6) => {
  const { data: response } = await AxiosInstance.get(
    `users?username=${username}&limit=${limit}&page=${page}`);

  return response.data;
};

export default {
  search
}