import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const usersActionTypes = {
    SET_PAGINATE_USERS_LIST: 'USERS.SET_PAGINATE_USERS_LIST',
    SET_SEARCH_USERS_LIST: 'USERS.SET_SEARCH_USERS_LIST',
    SET_USER: 'USERS.SET_USER',
}

export const setSearchUsersList = (payload) => ({type: usersActionTypes.SET_SEARCH_USERS_LIST, payload});
export const setPaginateUsersList = (payload) => ({type: usersActionTypes.SET_PAGINATE_USERS_LIST, payload});
export const setUser = (payload) => ({type: usersActionTypes.SET_USER, payload});

export const setSearchUsersListAsync = (username) => async dispatch => {
    const {data: response} = await apiClient.get(`users?username=${username}`);

    dispatch(setSearchUsersList(response));
};

export const setPaginateUsersListAsync = (page) => async dispatch => {
    const {data: response} = await apiClient.get(`users?page=${page}`);

    dispatch(setPaginateUsersList(response));
};

export const addUserAsync = username => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}`);

    dispatch(setUser(response));
};