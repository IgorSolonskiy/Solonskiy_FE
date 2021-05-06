export const postsActionTypes = {
    ADD_POSTS_LIST: 'POSTS.ADD_POSTS_LIST',
    ADD_ONE_POST_LIST: 'POSTS.ADD_POST_LIST',
    CLEAR_POSTS_LIST: 'POSTS.CLEAR_POSTS_LIST',
    REMOVE_POST: 'POSTS.REMOVE_POST',
    ADD_POST: 'POST.ADD_POST',
    CLEAR_POST: 'POST.CLEAR_POSTS_LIST',
    CHANGE_POST: 'POST.CHANGE_POST',
}

export const postsActions = {
    addPostsList: (payload) => ({type: postsActionTypes.ADD_POSTS_LIST, payload}),
    addPostList: (payload) => ({type: postsActionTypes.ADD_ONE_POST_LIST, payload}),
    addPost: (payload) => ({type: postsActionTypes.ADD_POST, payload}),
    clearPostsList: (payload) => ({type: postsActionTypes.CLEAR_POSTS_LIST, payload}),
    clearPost: (payload) => ({type: postsActionTypes.CLEAR_POST, payload}),
    removePost: (payload) => ({type: postsActionTypes.REMOVE_POST, payload}),
    changePost: (payload) => ({type: postsActionTypes.CHANGE_POST, payload}),
}