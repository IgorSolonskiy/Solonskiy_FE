import {createAction} from "redux-smart-actions";

export const getComments = (id, cursor = '') => ({
    type: getCommentsAsync,
    requestKey: id + cursor,
    multiple: true,
    autoLoad: true,
    variables: [id, cursor]
});

export const getCommentsAsync = createAction('GET_COMMENTS', (id, cursor = "") => ({
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
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
    }
}));

export const createCommentAsync = createAction('SET_COMMENT', (id, comment) => ({
    request: {
        url: `posts/${id}/comments`,
        params: comment,
        method: "post",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        mutations: {
            getCommentsAsync: {
                updateData: (prevState, comment) => {
                    return {
                        ...prevState,
                        comments: [...prevState.comments, comment],
                    };
                },
            },
        },
    },
}));

export const deleteCommentAsync = createAction('DELETE_COMMENT', id => ({
    request: {
        url: `comments/${id}`,
        method: "delete",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: id})

            return response;
        },
        mutations: {
            getCommentsAsync: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        comments: prevState.comments.filter(comment => comment.id !== id),
                    };
                },
            },
        },
    },
}));

export const updateCommentAsync = createAction('UPDATE_COMMENT', (id, comment) => ({
    request: {
        url: `comments/${id}`,
        params: comment,
        method: "put",
    },
    meta: {
        mutations: {
            getCommentsAsync: {
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
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
    },
}));