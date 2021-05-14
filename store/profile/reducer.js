import {profileActionTypes} from "./actions";

const initialState = {
    profile: {},
    profileId: null,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case profileActionTypes.SET_PROFILE:
            return {...state, profile: action.payload}

        case profileActionTypes.SET_PROFILE_ID:
            return {...state, profileId: action.payload}

        default:
            return state
    }
}