import apiClient from "../../libs/apiClient";
import apiServer from "../../libs/apiServer";

export const postsActionTypes = {
    SET_POSTS_LIST: 'POSTS.SET_POSTS_LIST',
    ADD_ONE_POST_LIST: 'POSTS.ADD_POST_LIST',
    REMOVE_POST: 'POSTS.REMOVE_POST',
    SET_POST: 'POSTS.SET_POST',
    CHANGE_POST: 'POSTS.CHANGE_POST',
    SET_POST_ID: 'POSTS.SET_POST_ID'
}

export const setPostsList = (payload) => ({type: postsActionTypes.SET_POSTS_LIST, payload});
export const addOnePostList = (payload) => ({type: postsActionTypes.ADD_ONE_POST_LIST, payload});
export const setPost = (payload) => ({type: postsActionTypes.SET_POST, payload});
export const removePost = (payload) => ({type: postsActionTypes.REMOVE_POST, payload});
export const changePost = (payload) => ({type: postsActionTypes.CHANGE_POST, payload});
export const setPostId = (payload) => ({type: postsActionTypes.SET_POST_ID, payload});

export const setPostsListClientAsync = (username, page) => async dispatch => {
    const {data: response} = await apiClient
        .get(`users/${username}/posts?limit=${process.env.PER_PAGE_POSTS_PAGINATE}&page=${page}`)

    dispatch(setPostsList(response));
};

export const setPostsListServerAsync = (username) => async dispatch => {
    const {data: response} = await apiServer
        .get(`users/${username}/posts?limit=${process.env.PER_PAGE_POSTS_PAGINATE}&page=${process.env.DEFAULT_PAGINATE_POSTS_PAGE_SERVER}`)

    dispatch(setPostsList(response));
};

export const addOnePostListAsync = (post) => async dispatch => {
    const {data: response} = await apiClient.post('posts', post);

    dispatch(addOnePostList(response));
};

export const setPostAsync = (id) => async dispatch => {
    const {data: response} = await apiServer.get(`posts/${id}`);

    dispatch(setPost(response));
};

export const changePostAsync = (id, post) => async dispatch => {
    const {data: response} = await apiClient.put(`posts/${id}`, post);

    dispatch(changePost(response))
};


export const deletePostAsync = (id) => async dispatch => {
    await apiClient.delete(`posts/${id}`);
    dispatch(removePost(id))
};