import {createAction} from "redux-smart-actions";

export const getProfile = () => ({type: getProfileAsync.toString()});

export const getProfileAsync = createAction('GET_PROFILE', () => ({
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
}));

export const updateProfileAsync = createAction('UPDATE_PROFILE', (updateData) => ({
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
      getProfileAsync: {
        updateData: (data, mutateData) => {
          return {
            profile: mutateData,
          };
        },
      },
    },
  },
}));
