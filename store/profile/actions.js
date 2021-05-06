export const profileActionTypes = {
    ADD_PROFILE: 'PROFILE.ADD_PROFILE',
}

export const profileActions = {
    addProfile: (payload) => ({type: profileActionTypes.ADD_PROFILE, payload}),
}