import {createAction} from "redux-smart-actions";

export const getPosts = (username, cursor = '') => ({
    type: getPostsAsync,
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
    type: getPostAsync,
});

export const getPostsAsync = createAction('GET_POSTS', (username, cursor) => ({
    request: {
        url: `users/${username}/posts?cursor=${cursor}`,
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
    }
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
            store.dispatch({type: requestAction.type, payload: response.data})

            return response;
        },
        mutations: {
            getPostsAsync: {
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

export const getPostAsync = createAction('GET_POST', (id= null) => ({
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

export const updatePostAsync = createAction('UPDATE_POST', (id, post) => ({
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
        mutations: {
            getPostsAsync: {
                updateData: (prevState, changedPost) => {
                    return {
                        ...prevState,
                        posts: prevState.posts.map(
                            post => post.id === id ? changedPost : post),
                    };
                },
            },
            getPostAsync: {
                updateData: (prevState, updatePost) => {
                    return {
                        ...prevState,
                        post: updatePost,
                    };
                },
            },
        },
    },
}));

export const deletePostAsync = createAction('DELETE_POST', (id) => ({
    request: {
        url: `posts/${id}`,
        method: "delete",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: requestAction.type, payload: id})

            return response;
        },
        mutations: {
            getPostsAsync: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        posts: prevState.posts.filter(post => post.id !== id),
                    };
                },
            },
        },
    },
}));

