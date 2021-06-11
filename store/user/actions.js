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
  },
  meta: {
    mutations: {
      [usersActionTypes.SET_FOLLOWINGS]: {
        updateData: ({followings}) => {
          return {
            followings: [...followings, username],
          };
        },
      },
    },
  },
});

export const getFollowingsAsync = (username) => ({
  type: usersActionTypes.SET_FOLLOWINGS,
  request: {
    url: `users/${username}/followings`,
  },
  meta: {
    getData: (data) => {
      return {
        followings: data.map(user => user.username),
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
      [usersActionTypes.SET_FOLLOWINGS]: {
        updateData: (prevState) => {
          return {
            ...prevState,
            followings: prevState.followings.filter(
                user => user !== username),
          };
        },
      },
    },
  },
});