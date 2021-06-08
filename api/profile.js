import Instance from "../libs/Instance";

export const getProfile = async () => {
  const { data: response } = await Instance.get("profile");

  return response;
};

export default {
  getProfile
}