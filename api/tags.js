import apiClient from "../libs/apiClient";

const search = async (tag) => {
  const {data: response} = await apiClient.get(`tags?name=${tag}`);

  return response.data;
};

export default {
  search
}