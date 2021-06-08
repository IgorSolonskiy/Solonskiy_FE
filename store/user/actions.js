import AxiosInstance from "../../libs/axiosInstance";

export const usersActionTypes = {
  SET_USERS: "USERS.SET_USERS",
  SET_USER: "USERS.SET_USER",
};

export const setUsers = (payload) => ({ type: usersActionTypes.SET_USERS, payload });
export const setUser = (payload) => ({ type: usersActionTypes.SET_USER, payload });

export const searchUsersAsync = (username, page = 1, limit = 6) => async dispatch => {
  const { data: response } = await AxiosInstance
    .get(`users?username=${username}&limit=${limit}&page=${page}`);

  dispatch(setUsers(response));
};

export const getUsersAsync = (page, limit = 6) => async dispatch => {
  const { data: response } = await AxiosInstance.get(`users?page=${page}&limit=${limit}`)

  dispatch(setUsers(response));
};

export const addUserAsync = username => async dispatch => {
  const { data: response } = await AxiosInstance.get(`users/${username}`);

  dispatch(setUser(response));
};