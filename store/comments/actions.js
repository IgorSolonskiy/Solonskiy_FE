import {createAction} from "redux-smart-actions";
import toast from "react-hot-toast";
import {createPostAsync} from "../posts/actions";

export const getComments = (id, cursor = '') => ({
    type: getCommentsAsync,
    requestKey: cursor,
    multiple: true,
    autoLoad: true,
    variables: [id, cursor]
});

export const getCommentsAsync = createAction('GET_COMMENTS', (id, cursor = "") => ({
    request: {
        url: `posts/${id}/comments?cursor=${cursor}`,
    },
    meta: {
        requestKey: cursor,
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
            store.dispatch({type: requestAction.type + 'REMOVE_PRELOAD'})
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type + 'PRELOAD', payload: comment})

            return request;
        },
        onError: (error, requestAction, store) => {
            store.dispatch({type: requestAction.type + 'REMOVE_PRELOAD'})
            toast.error(error.message);

            return error
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

export const deleteCommentAsync = createAction('DELETE_COMMENT', comment => ({
    request: {
        url: `comments/${comment.id}`,
        method: "delete",
    },
    meta: {
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: comment.id})

            return request;
        },
        onError: (error, requestAction, store) => {
            store.dispatch({type: createCommentAsync.toString(), payload: comment})
            toast.error(error.message);

            return error
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
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: {id, content: comment.content}})

            return request;
        },
        onError: (error, requestAction, store) => {
            const state = store.getState();
            const comments = state.requests.queries[getCommentsAsync.toString()].data.comments;
            const prevComment = comments.filter(comment => comment.id === id)

            store.dispatch({type: requestAction.type, payload: prevComment[0]})
            toast.error(error.message);

            return error
        },
        mutations: {
            [getCommentsAsync.toString()]: {
                updateData: (prevState, changedPost) => {
                    return changedPost
                        ? {
                            ...prevState,
                            comments: prevState.comments.map(comment => comment.id === id ? changedPost : comment)
                        }
                        : prevState;
                },
            },
        },
    },
}));