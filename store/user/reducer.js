import {usersActionTypes} from "./actions";

const initialState = {
    paginateUsers: {},
    searchUsers: [],
    user: null,
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case usersActionTypes.SET_PAGINATE_USERS_LIST:
            return {...state, paginateUsers: action.payload}

        case usersActionTypes.SET_SEARCH_USERS_LIST:
            return {...state, searchUsers: [...action.payload]}

        case usersActionTypes.SET_USER:
            return {...state, user: action.payload}

        default:
            return state
    }
}