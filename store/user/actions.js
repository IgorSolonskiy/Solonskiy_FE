import {createAction} from "redux-smart-actions";

export const getUsers = (page = 1, searchName = '') => ({
    type: getUsersAsync,
    requestKey: searchName + page,
    multiple: true,
    autoLoad: true,
    variables: [searchName, page]
});

export const getUser = (requestKey) => ({
    type: getUserAsync,
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

export const followUserAsync = (username) => ({
  type: usersActionTypes.SET_FOLLOW,
  request: {
    url: `users/${username}/follow`,
    method: "post",
  },
  meta: {
    mutations: {
      [profileActionTypes.GET_PROFILE]: {
        updateData: ({profile}, following) => {
          return {
            profile: {
              ...profile,
              followings: [...profile.followings, following],
            },
          };
        },
      },
    },
  },
});

export const getFollowingAsync = (username, page = 1, limit = 6) => ({
  type: usersActionTypes.GET_USERS,
  request: {
    url: `users/${username}/followings?page=${page}&limit=${limit}`,
  },
  meta: {
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

export const getFollowersAsync = (username, page = 1, limit = 6) => ({
  type: usersActionTypes.GET_USERS,
  request: {
    url: `users/${username}/followers?page=${page}&limit=${limit}`,
  },
  meta: {
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

export const unfollowUserAsync = (username) => ({
  type: usersActionTypes.DELETE_FOLLOW,
  request: {
    url: `users/${username}/unfollow`,
    method: "delete",
  },
  meta: {
    mutations: {
      [profileActionTypes.GET_PROFILE]: {
        updateData: ({profile}) => {
          return {
            profile: {
              ...profile,
              followings: profile.followings.filter(
                  user => user.username !== username),
            },
          };
        },
      },
    },
  },
});