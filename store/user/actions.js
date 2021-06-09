import apiClient from "../../libs/apiClient";

export const usersActionTypes = {
  SET_USERS: "USERS.SET_USERS",
  SET_USER: "USERS.SET_USER",
};

export const setUsers = () => ({
  type: usersActionTypes.SET_USER,
});
export const setUser = () => ({
  type: usersActionTypes.SET_USER,
});

export const searchUsersAsync = (
    username, page = 1, limit = 6) => async dispatch => {
  const {data: response} = await apiClient.get(
      `users?username=${username}&limit=${limit}&page=${page}`);

  dispatch(setUsers(response));
};

export const getUsersAsync = (page, limit = 6) => async dispatch => {
  const {data: response} = await apiClient.get(`users?page=${page}&limit=${limit}`);

  dispatch(setUsers(response));
};

export const addUserAsync = (username) => ({
  type: usersActionTypes.SET_USER,
  request: {
    url: `users/${username}`,
  },
  meta: {
    getData: (data) => {
      return {
        user: data,
      };
    },
  },
});