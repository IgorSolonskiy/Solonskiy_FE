import { usersActionTypes } from "./actions";

const initialState = {
  paginateUsersData: {},
  searchUsersList: [],
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersActionTypes.SET_PAGINATE_USERS_DATA:
      return { ...state, paginateUsersData: action.payload };

    case usersActionTypes.SET_SEARCH_USERS_LIST:
      return { ...state, searchUsersList: [...action.payload] };

    case usersActionTypes.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};