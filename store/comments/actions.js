export const commentsActionTypes = {
    GET_COMMENTS: "COMMENTS.GET_COMMENTS",
    SET_COMMENT: "COMMENTS.SET_COMMENT",
    DELETE_COMMENT: "COMMENTS.DELETE_COMMENT",
    UPDATE_COMMENT: "COMMENTS.UPDATE_COMMENT",
};

export const getComments = (id,cursor = '') => ({
    type: commentsActionTypes.GET_COMMENTS,
    requestKey: id + cursor,
    multiple: true,
    autoLoad: true,
    action: getCommentsAsync,
    autoReset: true,
    variables: [id, cursor]
});

export const getCommentsAsync = (id, cursor = "") => ({
    type: commentsActionTypes.GET_COMMENTS,
    request: {
        url: `posts/${id}/comments?cursor=${cursor}`,
    },
    meta: {
        requestKey: id + cursor,
        getData: (data) => {
            return {
                comments: data.data,
                nextCursor: data.links.next
                    ? data.links.next.match(/cursor=(\w+)/)[1]
                    : data.links.next,
            };
        },
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: commentsActionTypes.GET_COMMENTS, payload: response.data})

            return response;
        },
    },
});

export const createCommentAsync = (id, comment) => ({
    type: commentsActionTypes.SET_COMMENT,
    request: {
        url: `posts/${id}/comments`,
        params: comment,
        method: "post",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: commentsActionTypes.SET_COMMENT, payload: response.data})

            return response;
        },
        mutations: {
            [commentsActionTypes.GET_COMMENTS]: {
                updateData: (prevState, comment) => {
                    return {
                        ...prevState,
                        comments: [...prevState.comments, comment],
                    };
                },
            },
        },
    },
});

export const deleteCommentAsync = (id) => ({
    type: commentsActionTypes.DELETE_COMMENT,
    request: {
        url: `comments/${id}`,
        method: "delete",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: commentsActionTypes.DELETE_COMMENT, payload: id})

            return response;
        },
        mutations: {
            [commentsActionTypes.GET_COMMENTS]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        comments: prevState.comments.filter(comment => comment.id !== id),
                    };
                },
            },
        },
    },
});

export const updateCommentAsync = (id, comment) => ({
    type: commentsActionTypes.UPDATE_COMMENT,
    request: {
        url: `comments/${id}`,
        params: comment,
        method: "put",
    },
    meta: {
        mutations: {
            [commentsActionTypes.GET_COMMENTS]: {
                updateData: (prevState, changedPost) => {
                    return {
                        ...prevState,
                        comments: prevState.comments.map(
                            comment => comment.id === id ? changedPost : comment),
                    };
                },
            },
        },
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: commentsActionTypes.UPDATE_COMMENT, payload: response.data})

            return response;
        },
    },
});