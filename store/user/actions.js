import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const userActionTypes = {
    SET_USERS_LIST: 'USERS.SET_USERS_LIST',
    SET_USER: 'USER.SET_USER',
    SET_VISIBLE: 'VISIBLE.SET_VISIBLE',
    SET_SEARCH_USERS_LIST:'SEARCH.SET_SEARCH_USERS_LIST'
}

export const userActions = {
    setUsersList: (payload) => ({type: userActionTypes.SET_USERS_LIST, payload}),
    setUser: (payload) => ({type: userActionTypes.SET_USER, payload}),
    setVisible: (payload) => ({type: userActionTypes.SET_VISIBLE, payload}),
    setSearchUsersList: (payload) => ({type: userActionTypes.SET_SEARCH_USERS_LIST, payload}),
}

export const setUsersListAsync = () => async dispatch => {
        const {data: response} = await apiClient.get('users');

        dispatch(userActions.setSearchUsersList(response));
};

export const addUserAsync = username => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}`);

    dispatch(userActions.setUser(response));
};