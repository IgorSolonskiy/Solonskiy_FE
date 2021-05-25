import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const usersActionTypes = {
  SET_PAGINATE_USERS_DATA: "USERS.SET_PAGINATE_USERS_DATA",
  SET_SEARCH_USERS_LIST: "USERS.SET_SEARCH_USERS_LIST",
  SET_USER: "USERS.SET_USER",
};

export const setSearchUsersList = (payload) => ({ type: usersActionTypes.SET_SEARCH_USERS_LIST, payload });
export const setPaginateUsersData = (payload) => ({ type: usersActionTypes.SET_PAGINATE_USERS_DATA, payload });
export const setUser = (payload) => ({ type: usersActionTypes.SET_USER, payload });

export const setSearchUsersListAsync = (username) => async dispatch => {
  const { data: response } = await apiClient
    .get(`users?username=${username}&limit=${process.env.NUMBER_TOTAL_SEARCH_USERS}`);

  dispatch(setSearchUsersList(response.data));
};

export const setPaginateUsersDataAsync = (page) => async dispatch => {
  const { data: response } = await apiClient
    .get(`users?limit=${process.env.NUMBER_TOTAL_PAGINATE_USERS}&page=${page}`);

  dispatch(setPaginateUsersData(response));
};

export const addUserAsync = username => async dispatch => {
  const { data: response } = await apiServer.get(`users/${username}`);

  dispatch(setUser(response));
};