import { usersActionTypes } from "./actions";

const initialState = {
  users: [],
  pagination: {
    total: null,
    perPage: null,
    currentPage: 1
  },
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersActionTypes.SET_USERS:
      return {
        ...state, users: action.payload.data,
        pagination: {
          total: action.payload.meta.total,
          perPage: action.payload.meta.per_page,
          currentPage: action.payload.meta.current_page
        }
      };

    case usersActionTypes.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};