import apiClient from "../libs/apiClient";

export const getProfile = async () => {
  const {data: response} = await apiClient.get("profile");

  return response;
};

export const change = updatedProfile => apiClient.post("profile",
    updatedProfile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

export default {
  getProfile,
  change,
};