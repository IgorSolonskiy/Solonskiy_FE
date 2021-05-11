import apiServer from "../../libs/apiServer";

export const userActionTypes = {
    SET_USERS_LIST: 'USERS.SET_USERS_LIST',
    SET_USER: 'USER.SET_USER',
    SET_VISIBLE: 'VISIBLE.SET_VISIBLE',
}

export const userActions = {
    setUsersList: (payload) => ({type: userActionTypes.SET_USERS_LIST, payload}),
    setUser: (payload) => ({type: userActionTypes.SET_USER, payload}),
    setVisible: (payload) => ({type: userActionTypes.SET_VISIBLE, payload}),
}

export const setUsersListAsync = username => async dispatch => {
    const {data: response} = await apiServer.get('users');

    dispatch(userActions.setUsersList(response));
};

export const addUserAsync = username => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}`);

    dispatch(userActions.setUser(response));
};