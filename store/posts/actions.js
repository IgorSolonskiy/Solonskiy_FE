import apiClient from "../../libs/apiClient";
import apiServer from "../../libs/apiServer";

export const postsActionTypes = {
    SET_POSTS_LIST: 'POSTS.SET_POSTS_LIST',
    ADD_ONE_POST_LIST: 'POSTS.ADD_POST_LIST',
    REMOVE_POST: 'POSTS.REMOVE_POST',
    SET_POST: 'POST.SET_POST',
    CHANGE_POST: 'POST.CHANGE_POST',
    SET_POST_ID: 'ID.SET_POST_ID'
}

export const postsActions = {
    setPostsList: (payload) => ({type: postsActionTypes.SET_POSTS_LIST, payload}),
    addOnePostList: (payload) => ({type: postsActionTypes.ADD_ONE_POST_LIST, payload}),
    setPost: (payload) => ({type: postsActionTypes.SET_POST, payload}),
    removePost: (payload) => ({type: postsActionTypes.REMOVE_POST, payload}),
    changePost: (payload) => ({type: postsActionTypes.CHANGE_POST, payload}),
    setPostId: (payload) => ({type: postsActionTypes.SET_POST_ID, payload}),
}

export const setPostsListAsync = (username) => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}/posts`)

    dispatch(postsActions.setPostsList(response));
};

export const addOnePostListAsync= (post) => async dispatch => {
    const {data: response} = await apiClient.post('posts', post);

    dispatch(postsActions.addOnePostList(response));
};

export const setPostAsync = (id) => async dispatch => {
    const {data: response} = await apiServer.get(`posts/${id}`);

    dispatch(postsActions.setPost(response));
};

export const changePostAsync = (id, post) => async dispatch => {
    const {data: response} = await apiClient.put(`posts/${id}`, post);

    dispatch(postsActions.changePost(response))
};


export const deletePostAsync = (id) => async dispatch => {
    await apiClient.delete(`posts/${id}`);
    dispatch(postsActions.removePost(id))
};