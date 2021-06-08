import AxiosInstance from "../../libs/axiosInstance";
import Cookies from "js-cookie";

export const profileActionTypes = {
  SET_PROFILE: "PROFILE.SET_PROFILE"
};

export const setProfile = (payload) => ({ type: profileActionTypes.SET_PROFILE, payload });

export const setProfileAsync = () => async dispatch => {
  const { data: response } = await AxiosInstance.get("profile");

  dispatch(setProfile(response));
};

export const changeProfileAsync = (updatedProfile) => async dispatch => {
  const { data: response } = await AxiosInstance.post("profile", updatedProfile, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  dispatch(setProfile(response));
};

export const loginUserAsync = user => async dispatch => {
  const { data: { token: response } } = await AxiosInstance.post("login", user);

  await Cookies.set("token", response);
};

export const registerUserAsync = (user) => async dispatch => {
  const { data: { token: response } } = await AxiosInstance.post("register", user);

  await Cookies.set("token", response);
};

export const logoutUserAsync = () => async dispatch => {
  await AxiosInstance.get("logout");
  Cookies.remove("token");
  dispatch(setProfile({}));
};
