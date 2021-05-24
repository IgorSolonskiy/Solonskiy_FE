import { usersActionTypes } from "./actions";

const initialState = {
  users: [],
  user: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case usersActionTypes.SET_USERS_LIST:
      return { ...state, users: [...action.payload] };

    case usersActionTypes.SET_USER:
      return { ...state, user: action.payload };

    default:
      return state;
  }
};