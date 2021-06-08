import Api from "../libs/Api";

export const getProfile = async () => {
  const { data: response } = await Api.get("profile");

  return response;
};

export default {
  getProfile
}