import {profileActionTypes} from "../profile/actions";

export const usersActionTypes = {
  GET_USERS: "USERS.GET_USERS",
  GET_USER: "USERS.GET_USER",
  GET_FOLLOWING: "USERS.GET_FOLLOWING",
  SET_FOLLOW: "USERS.SET_FOLLOW",
  DELETE_FOLLOW: "USERS.DELETE_FOLLOW",

};

export const getUsers = () => ({
  type: usersActionTypes.GET_USERS,
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