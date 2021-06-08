import apiServer from "../libs/apiServer";

const getProfile = async () => {
  const { data: response } = await apiServer.get("profile");

  return response;
};

export default {
  getProfile
}