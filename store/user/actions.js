import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const usersActionTypes = {
    SET_USERS_LIST: 'USERS.SET_USERS_LIST',
    SET_USER: 'USERS.SET_USER',
}

export const setUsersList = (payload) => ({type: usersActionTypes.SET_USERS_LIST, payload});
export const setUser = (payload) => ({type: usersActionTypes.SET_USER, payload});

export const setUsersListAsync = (username) => async dispatch => {
    const {data: response} = await apiClient.get(`users?username=${username}`);

    dispatch(setUsersList(response));
};

export const addUserAsync = username => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}`);

    response.avatar = response.avatar ? response.avatar : '../defaultAvatar.png';
    dispatch(setUser(response));
};