import apiClient from "../../libs/apiClient";

export const profileActionTypes = {
  SET_PROFILE: "PROFILE.SET_PROFILE"
};

export const setProfile = () => ({ type: profileActionTypes.SET_PROFILE });

export const setProfileAsync = () => ({
  type: profileActionTypes.SET_PROFILE,
  request: {
    url: `profile`,
  },
  meta: {
    getData: (data) => {
      return {
        profile: data
      };
    },
  },
});

export const changeProfileAsync =async  (updatedProfile) => {
  const { data: response } = await apiClient.post("profile", updatedProfile, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

};