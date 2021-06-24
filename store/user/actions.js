import {createAction} from "redux-smart-actions";

export const getUsers = (page = 1, searchName = '') => ({
    type: getUsersAsync,
    requestKey: searchName + page,
    multiple: true,
    autoLoad: true,
    variables: [searchName, page]
});

export const getFollowings = (page = 1, username = '') => ({
    type: getFollowingAsync,
    requestKey: username + page,
    multiple: true,
    autoLoad: true,
    variables: [username, page]
});

export const getFollowers = (page = 1, username = '') => ({
    type: getFollowersAsync,
    requestKey: username + page,
    multiple: true,
    autoLoad: true,
    variables: [username, page]
});

export const getUser = () => ({
    type: getUserAsync
});

export const getUsersAsync = createAction('GET_USERS', (username = '', page = 1) => ({
    request: {
        url: `users?username=${username}&limit=6&page=${page}`,
    },
    meta: {
        requestKey: username + page,
        cache: 60,
        getData: (data) => {
            return {
                users: data.data,
                total: data.meta.total,
                perPage: data.meta.per_page,
                currentPage: data.meta.current_page,
            };
        },
    },
}));

export const getUserAsync = createAction('GET_USER', (username = '') => ({
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
}));

export const followUserAsync = createAction('SET_FOLLOW', (username = '',requestKey= '') => ({
    request: {
        url: `users/${username}/follow`,
        method: "post",
    },
    meta: {
        mutations: {
            [getUsersAsync.toString() + requestKey]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        users: prevState.users.map(user => {
                            if (user.username === username) {
                                user.following = true
                            }
                            return user;
                        })
                    };
                },
            },
        },
    },
}));

export const getFollowingAsync = createAction('GET_FOLLOWINGS', (username, page = 1) => ({
    request: {
        url: `users/${username}/followings?page=${page}&limit=6`,
    },
    meta: {
        requestKey: username + page,
        cache: 60,
        getData: (data) => {
            return {
                followings: data.data,
                total: data.meta.total,
                perPage: data.meta.per_page,
                currentPage: data.meta.current_page,
            };
        },
    },
}));

export const getFollowersAsync = createAction('GET_FOLLOWERS', (username = '', page = 1) => ({
    request: {
        url: `users/${username}/followers?page=${page}&limit=6`,
    },
    meta: {
        requestKey: username + page,
        cache: 60,
        getData: (data) => {
            return {
                followers: data.data,
                total: data.meta.total,
                perPage: data.meta.per_page,
                currentPage: data.meta.current_page,
            };
        },
    },
}));

export const unfollowUserAsync = createAction('DELETE_FOLLOW', (username = '',requestKey) => ({
    request: {
        url: `users/${username}/unfollow`,
        method: "delete",
    },
    meta: {
        mutations: {
            [getUsersAsync.toString() + requestKey]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        users: prevState.users.map(user => {
                            if (user.username === username) {
                                user.following = false
                            }
                            return user;
                        })
                    };
                },
            },
        },
    },
}));
