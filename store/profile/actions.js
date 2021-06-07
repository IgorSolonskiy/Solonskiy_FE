import Api from "../../libs/Api";
import Cookies from "js-cookie";

export const profileActionTypes = {
  SET_PROFILE: "PROFILE.SET_PROFILE"
};

export const setProfile = (payload) => ({ type: profileActionTypes.SET_PROFILE, payload });

export const setProfileAsync = () => async dispatch => {
  const { data: response } = await Api.get("profile");

  dispatch(setProfile(response));
};

export const changeProfileAsync = (updatedProfile) => async dispatch => {
  const { data: response } = await Api.post("profile", updatedProfile, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  dispatch(setProfile(response));
};

export const loginUserAsync = user => async dispatch => {
  const { data: { token: response } } = await Api.post("login", user);

  await Cookies.set("token", response);
};

export const registerUserAsync = (user) => async dispatch => {
  const { data: { token: response } } = await Api.post("register", user);

  await Cookies.set("token", response);
};

export const logoutUserAsync = () => async dispatch => {
  await Api.get("logout");
  Cookies.remove("token");
  dispatch(setProfile({}));
};
