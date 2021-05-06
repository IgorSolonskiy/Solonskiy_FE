export const userActionTypes = {
    ADD_USER: 'USER.ADD_USER',
}

export const userActions = {
    addUser: (payload) => ({type: userActionTypes.ADD_USER, payload}),
}