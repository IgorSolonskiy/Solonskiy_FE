export const usersActionTypes = {
    GET_USERS: "USERS.GET_USERS",
    GET_USER: "USERS.GET_USER",
};

export const getUsers = (page = 1, searchName = '') => ({
    type: usersActionTypes.GET_USERS,
    requestKey: searchName + page,
    multiple: true,
    autoLoad: true,
    action: getUsersAsync,
    variables: [searchName, page, true]
});
export const getUser = (requestKey) => ({
    type: usersActionTypes.GET_USER,
    requestKey
});

export const getUsersAsync = (
    username = '', page = 1, cache = false) => ({
    type: usersActionTypes.GET_USERS,
    request: {
        url: `users?username=${username}&limit=6&page=${page}`,
    },
    meta: {
        requestKey: username + page,
        cache,
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