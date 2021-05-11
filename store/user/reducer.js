import {userActionTypes} from "./actions";

const initialState = {
    users: [],
    user: null,
    isVisible: false
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.SET_USERS_LIST:
            return {...state, users: [...action.payload]}

        case userActionTypes.SET_USER:
            return {...state, user: action.payload}

        case userActionTypes.SET_VISIBLE:
            return {...state, isVisible: action.payload}

        default:
            return state
    }
}