import Api from "../libs/Api";

export const getSearchUsers = async (username, page = 1, limit = 6) => {
  const { data: response } = await Api.get(
    `users?username=${username}&limit=${limit}&page=${page}`);

  return response.data;
};

export const getUsers = async (username) => {
  const { data: response } = await Api(`users/${username}`);

  return response.data;
};