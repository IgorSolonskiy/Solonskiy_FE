export const usersActionTypes = {
    GET_USERS: "USERS.GET_USERS",
    GET_USER: "USERS.GET_USER",
};

export const getUsers = (requestKey = 1) => ({
    type: usersActionTypes.GET_USERS,
    requestKey,
    multiple: true
});
export const getUser = () => ({
    type: usersActionTypes.GET_USER,
});

export const searchUsersAsync = (
    username, page = 1, limit = 6) => ({
    type: usersActionTypes.GET_USERS,
    request: {
        url: `users?username=${username}&limit=${limit}&page=${page}`,
    },
    meta: {
        requestKey: page,
        getData: (data) => {
            return {
                users: data.data,
                total: data.meta.total,
                perPage: data.meta.per_page,
                currentPage: data.meta.current_page,
            };
        },
    },
});

export const getUsersAsync = (page = 1, limit = 6) => ({
    type: usersActionTypes.GET_USERS,
    request: {
        url: `users?page=${page}&limit=${limit}`,
    },
    meta: {
        requestKey: page,
        getData: (data) => {
            return {
                users: data.data,
                total: data.meta.total,
                perPage: data.meta.per_page,
                currentPage: data.meta.current_page,
            };
        },
    },
});

export const getUserAsync = (username) => ({
    type: usersActionTypes.GET_USER,
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