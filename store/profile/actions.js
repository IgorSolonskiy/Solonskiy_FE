export const profileActionTypes = {
  GET_PROFILE: "PROFILE.GET_PROFILE",
  UPDATE_PROFILE: "PROFILE.UPDATE_PROFILE",
};

export const getProfile = () => ({type: profileActionTypes.GET_PROFILE});

export const getProfileAsync = () => ({
  type: profileActionTypes.GET_PROFILE,
  request: {
    url: `profile`,
  },
  meta: {
    getData: (data) => {
      return {
        profile: data,
      };
    },
  },
});

export const updateProfileAsync = (updateData) => ({
  type: profileActionTypes.UPDATE_PROFILE,
  request: {
    url: `profile`,
    method: "post",
    data: updateData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  },
  meta: {
    mutations: {
      [profileActionTypes.GET_PROFILE]: {
        updateData: (data, mutateData) => {
          return {
            profile: mutateData,
          };
        },
      },
    },
  },
});