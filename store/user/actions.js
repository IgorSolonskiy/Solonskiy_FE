export const usersActionTypes = {
  SET_USERS: "USERS.SET_USERS",
  SET_FOLLOWERS: "USERS.SET_FOLLOWERS",
  SET_FOLLOWINGS: "USERS.SET_FOLLOWINGS",
  ADD_FOLLOW: "USERS.ADD_FOLLOW",
  REMOVE_FOLLOW: "USERS.REMOVE_FOLLOW",
  SET_USER: "USERS.SET_USER",
};

export const setUsers = () => ({
  type: usersActionTypes.SET_USERS,
});
export const setUser = () => ({
  type: usersActionTypes.SET_USER,
});
export const setFollowers = () => ({
  type: usersActionTypes.SET_FOLLOWERS,
});

export const setFollowings = () => ({
  type: usersActionTypes.SET_FOLLOWINGS,
});

export const searchUsersAsync = (
    username, page = 1, limit = 6) => ({
  type: usersActionTypes.SET_USERS,
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
  type: usersActionTypes.SET_USERS,
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

export const addUserAsync = (username) => ({
  type: usersActionTypes.SET_USER,
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
  type: usersActionTypes.ADD_FOLLOW,
  request: {
    url: `users/${username}/follow`,
    method:'post'
  },
  meta: {
    mutations: {
      [usersActionTypes.SET_USER]: {
        updateData: ({user}, following) => {
          return {
            user: {
              ...user,
              followings: [...user.followings, following],
            },
          };
        },
      },
    },
  },
});

export const getFollowingAsync = (username,page = 1, limit = 6) => ({
  type: usersActionTypes.SET_USERS,
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

export const getFollowersAsync = (username,page = 1, limit = 6) => ({
  type: usersActionTypes.SET_USERS,
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
  type: usersActionTypes.REMOVE_FOLLOW,
  request: {
    url: `users/${username}/unfollow`,
    method: "delete",
  },
  meta: {
    mutations: {
      [usersActionTypes.SET_USER]: {
        updateData: ({user}) => {
          return {
            user: {
              ...user,
              followings: user.followings.filter(
                  user => user.username !== username),
            },
          };
        },
      },
    },
  },
});