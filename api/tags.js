import AxiosInstance from "../libs/axiosInstance";

const search = async (tag) => {
  const {data: response} = await AxiosInstance.get(`tags?name=${tag}`);

  return response.data;
};

export default {
  search
}