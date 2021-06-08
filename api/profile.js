import apiClient from "../libs/apiClient";

export const getProfile = async () => {
  const { data: response } = await apiClient.get("profile");

  return response;
};

export default {
  getProfile
}