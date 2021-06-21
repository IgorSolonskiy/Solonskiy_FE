import {createAction} from "redux-smart-actions";

export const getUsers = (page = 1, searchName = '') => ({
    type: getUsersAsync,
    requestKey: searchName + page,
    multiple: true,
    autoLoad: true,
    variables: [searchName, page]
});

export const getUser = (requestKey) => ({
    type: getUserAsync.toString(),
    requestKey
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

export const getUserAsync = createAction('GET_USERS', (username = '') => ({
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