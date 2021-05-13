import {profileActionTypes} from "./actions";

const initialState = {
    profile: {}
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.SET_PROFILE:
            return {...state, profile: action.payload}

        case profileActionTypes.REMOVE_PROFILE:
            return {...state, profile: {}}

        default:
            return state
    }
}