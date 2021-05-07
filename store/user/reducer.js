import {userActionTypes} from "./actions";

const initialState = {
    user: {}
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.ADD_USER:
            return {...state, user: action.payload}

        case userActionTypes.REMOVE_USER:
            return {...state, user: {}}

        default:
            return state
    }
}