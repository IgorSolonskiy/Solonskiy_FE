import {createAction} from "redux-smart-actions";
import toast from "react-hot-toast";


export const getPostsFeed = (username, cursor = '') => ({
    type: getPostsFeedAsync,
    requestKey: cursor,
    multiple: true,
    autoLoad: true,
    variables: [username, cursor]
});

export const getPostsByTag = (tag, cursor = '') => ({
    type: getPostsByTagAsync,
    requestKey: cursor,
    multiple: true,
    autoLoad: true,
    variables: [tag, cursor]
});

export const getPost = () => ({
    type: getPostAsync.toString(),
});

export const getPostsFeedAsync = createAction('GET_POSTS', (username,cursor = '') => ({
    request: {
        url: !username ? `posts/feed?cursor=${cursor}` : `users/${username}/posts?cursor=${cursor}`,
    },
    meta: {
        requestKey: cursor,
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        getData: (data) => {
            return {
                posts: data.data,
                nextCursor: data.links.next
                    ? data.links.next.match(/cursor=(\w+)/)[1]
                    : data.links.next,
            };
        },
    },
}));

export const getPostsByTagAsync = createAction('GET_POSTS', (tag, cursor = "") => ({
    request: {
        url: `tags/${tag}/posts?cursor=${cursor}`,
    },
    meta: {
        requestKey: cursor,
        getData: (data) => {
            return {
                posts: data.data,
                nextCursor: data.links.next
                    ? data.links.next.match(/cursor=(\w+)/)[1]
                    : data.links.next,
            };
        },
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
    },
}));

export const createPostAsync = createAction('CREATE_POST', (content) => ({
    request: {
        url: "posts",
        params: content,
        method: "post",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type + 'REMOVE_PRELOAD'})
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type + 'PRELOAD', payload: content})

            return request;
        },
        onError: (error, requestAction, store) => {
            store.dispatch({type: requestAction.type + 'REMOVE_PRELOAD'})
            toast.error(error.message);

            return error
        },
        mutations: {
            [getPostsFeedAsync.toString()]: {
                updateData: (prevState, post) => {
                    return prevState.cursor ? prevState : {
                        ...prevState,
                        posts: [...prevState.posts, post],
                    };
                },
            },
        },
    },
}));

export const getPostAsync = createAction('GET_POST', (id = null) => ({
    request: {
        url: `posts/${id}`,
    },
    meta: {
        getData: (data) => {
            return {
                post: data,
                postId: data.id,
            };
        },
    },
}));

export const updatePostAsync = createAction('UPDATE_POST', (id, post = {content: ''}) => ({
    request: {
        url: `posts/${id}`,
        method: "put",
        params: post,
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: {id, content: post.content}})

            return request;
        },
        onError: (error, requestAction, store) => {
            const state = store.getState();
            const posts = state.requests.queries[getPostsFeedAsync.toString()].data.posts;
            const prevPost = posts.filter(post => post.id === id)

            store.dispatch({type: requestAction.type, payload: prevPost[0]})
            toast.error(error.message);

            return error
        },
        mutations: {
            [getPostsFeedAsync.toString()]: {
                updateData: (prevState, changedPost) => {
                    return !changedPost
                        ? prevState
                        : {...prevState, posts: prevState.posts.map(post => post.id === id ? changedPost : post)}
                },
            },
            [getPostAsync.toString()]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        post: {...prevState.post, content: post.content},
                    };
                },
            },
        },
    },
}));

export const deletePostAsync = createAction('DELETE_POST', (post) => ({
    request: {
        url: `posts/${post.id}`,
        method: "delete",
    },
    meta: {
        onRequest: (request, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: post.id})

            return request;
        },
        onError: (error, requestAction, store) => {
            store.dispatch({type: createPostAsync.toString(), payload: post})
            toast.error(error.message);

            return error
        },
        mutations: {
            [getPostsFeedAsync.toString()]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        posts: prevState.posts.filter(post => post.id !== post.id),
                    };
                },
            },
        },
    },
}));

