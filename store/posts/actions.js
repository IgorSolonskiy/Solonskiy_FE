export const postsActionTypes = {
    GET_POSTS: "POSTS.GET_POSTS",
    GET_POST: "POSTS.GET_POST",
    SET_POSTS: "POSTS.SET_POSTS",
    SET_POST: "POSTS.SET_POST",
    DELETE_POST: "POSTS.DELETE_POST",
    UPDATE_POST: "POSTS.UPDATE_POST",
};

export const getPosts = (username, cursor = '') => ({
    type: postsActionTypes.GET_POSTS,
    requestKey: cursor,
    multiple: true,
    autoLoad: true,
    action: getPostsAsync,
    autoReset: true,
    variables: [username, cursor]
});

export const getPostsByTag = (tag, cursor = '') => ({
    type: postsActionTypes.GET_POSTS,
    requestKey: cursor,
    multiple: true,
    autoLoad: true,
    action: getPostsByTagAsync,
    autoReset: true,
    variables: [tag, cursor]
});


export const getPost = () => ({
    type: postsActionTypes.GET_POST,
});

export const getPostsAsync = (username, cursor) => ({
    type: postsActionTypes.GET_POSTS,
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
            store.dispatch({type: postsActionTypes.GET_POSTS, payload: response.data})

            return response;
        },
    },
});

export const getPostsByTagAsync = (tag, cursor = "") => ({
    type: postsActionTypes.GET_POSTS,
    request: {
        url: `tags/${tag}/posts?cursor=${cursor}`,
    },
    meta: {
        requestKey: cursor,
        getData: (data) => {
            return {
                posts:  data.data,
                nextCursor: data.links.next
                    ? data.links.next.match(/cursor=(\w+)/)[1]
                    : data.links.next,
            };
        },
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: postsActionTypes.GET_POSTS, payload: response.data})

            return response;
        },
    },
});

export const createPostAsync = (content) => ({
    type: postsActionTypes.SET_POST,
    request: {
        url: "posts",
        params: content,
        method: "post",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: postsActionTypes.SET_POST, payload: response.data})

            return response;
        },
        mutations: {
            [postsActionTypes.GET_POSTS]: {
                updateData: (prevState, post) => {
                    return prevState.cursor ? prevState : {
                        ...prevState,
                        posts: [...prevState.posts, post],
                    };
                },
            },
        },
    },
});

export const getPostAsync = (id) => ({
    type: postsActionTypes.GET_POST,
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
});

export const updatePostAsync = (id, post, cursor = '') => ({
    type: postsActionTypes.UPDATE_POST,
    request: {
        url: `posts/${id}`,
        method: "put",
        params: post,
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: postsActionTypes.UPDATE_POST, payload: response.data})

            return response;
        },
        mutations: {
            [postsActionTypes.GET_POSTS + cursor]: {
                updateData: (prevState, changedPost) => {
                    return {
                        ...prevState,
                        posts: prevState.posts.map(
                            post => post.id === id ? changedPost : post),
                    };
                },
            },
            [postsActionTypes.GET_POST]: {
                updateData: (prevState, updatePost) => {
                    return {
                        ...prevState,
                        post: updatePost,
                    };
                },
            },
        },
    },
});

export const deletePostAsync = (id) => ({
    type: postsActionTypes.DELETE_POST,
    request: {
        url: `posts/${id}`,
        method: "delete",
    },
    meta: {
        onSuccess: (response, requestAction, store) => {
            store.dispatch({type: postsActionTypes.DELETE_POST, payload: id})

            return response;
        },
        mutations: {
            [postsActionTypes.GET_POSTS]: {
                updateData: (prevState) => {
                    return {
                        ...prevState,
                        posts: prevState.posts.filter(post => post.id !== id),
                    };
                },
            },
        },
    },
});