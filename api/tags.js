import apiClient from "../libs/apiClient";

export const getSearchHashtags = async (tag) => {
  const {data: response} = await apiClient.get(`tags?name=${tag}`);

  return response.data;
};