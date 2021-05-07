export const commentsActionTypes = {
    ADD_COMMENTS_LIST: 'COMMENTS.ADD_COMMENTS_LIST',
    ADD_COMMENT: 'COMMENTS.ADD_COMMENT',
    REMOVE_COMMENT: 'COMMENTS.REMOVE_COMMENT',
}

export const commentsActions = {
    addCommentsList: (payload) => ({type: commentsActionTypes.ADD_COMMENTS_LIST, payload}),
    addComment: (payload) => ({type: commentsActionTypes.ADD_COMMENT, payload}),
    removeComment: (payload) => ({type: commentsActionTypes.REMOVE_COMMENT, payload}),
}