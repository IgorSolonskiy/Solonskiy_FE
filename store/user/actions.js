export const usersActionTypes = {
  GET_USERS: "USERS.GET_USERS",
  GET_USER: "USERS.GET_USER",
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
  type: usersActionTypes.ADD_FOLLOW,
  request: {
    url: `users/${username}/follow`,
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

export const getFollowingAsync = (username, page = 1, limit = 6) => ({
  type: usersActionTypes.SET_FOLLOWING,
  request: {
    url: `users/${username}/followings?page=${page}&limit=${limit}`,
  },
  meta: {
    mutations: {
      [usersActionTypes.SET_USERS]: {
        updateData: (data, updateData) => {
          return {
            users: updateData.data,
            total: updateData.meta.total,
            perPage: updateData.meta.per_page,
            currentPage: updateData.meta.current_page,
          };
        },
      },
    },
  },
});

export const getFollowersAsync = (username, page = 1, limit = 6) => ({
  type: usersActionTypes.SET_USERS,
  request: {
    url: `users/${username}/followers?page=${page}&limit=${limit}`,
  },
  meta: {
    updateData: (data, updateData) => {
      return {
        users: updateData.data,
        total: updateData.meta.total,
        perPage: updateData.meta.per_page,
        currentPage: updateData.meta.current_page,
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