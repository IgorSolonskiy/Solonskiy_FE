import apiClient from "../../../libs/apiClient";
import {postsActions} from "../actions";

export const createPost = (post) => async dispatch => {
    const {data: response} = await apiClient.post('posts', post);

    dispatch(postsActions.addPostList(response));
};

export const changePost = (id, post) => async dispatch => {
    const {data: response} = await apiClient.put(`posts/${id}`, post);

    dispatch(postsActions.changePost(response))
};


export const deletePost = (id) => async dispatch => {
    await apiClient.delete(`posts/${id}`);
    dispatch(postsActions.removePost(id))
};