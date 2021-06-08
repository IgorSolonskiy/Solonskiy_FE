import AxiosInstance from "../libs/axiosInstance";

export const getProfile = async () => {
  const { data: response } = await AxiosInstance.get("profile");

  return response;
};

export default {
  getProfile
}