import apiClient from "../../../libs/apiClient";
import {postsActions} from "../actions";
import apiServer from "../../../libs/apiServer";

export const addPostsListThunkCreator = (username) => async dispatch => {
    const {data: response} = await apiServer.get(`users/${username}/posts`)

    dispatch(postsActions.addPostsList(response));
};

export const addOnePostListThunkCreator = (post) => async dispatch => {
    const {data: response} = await apiClient.post('posts', post);

    dispatch(postsActions.addOnePostList(response));
};

export const addPostThunkCreator = (id) => async dispatch => {
    const {data: response} = await apiServer.get(`posts/${id}`);

    dispatch(postsActions.addPost(response));
};

export const changePostThunkCreator = (id, post) => async dispatch => {
    const {data: response} = await apiClient.put(`posts/${id}`, post);

    dispatch(postsActions.changePost(response))
};


export const deletePostThunkCreator = (id) => async dispatch => {
    await apiClient.delete(`posts/${id}`);
    dispatch(postsActions.removePost(id))
};