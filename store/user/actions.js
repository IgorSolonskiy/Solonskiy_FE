export const userActionTypes = {
    ADD_USER: 'USER.ADD_USER',
    REMOVE_USER: 'USER.REMOVE_USER',
}

export const userActions = {
    addUser: (payload) => ({type: userActionTypes.ADD_USER, payload}),
    removeUser: (payload) => ({type: userActionTypes.REMOVE_USER, payload}),
}