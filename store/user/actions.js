export const usersActionTypes = {
  SET_USERS: "USERS.SET_USERS",
  SET_USER: "USERS.SET_USER",
};

export const setUsers = () => ({
  type: usersActionTypes.SET_USERS,
});
export const setUser = () => ({
  type: usersActionTypes.SET_USER,
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