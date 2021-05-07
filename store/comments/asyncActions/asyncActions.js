import apiClient from "../../../libs/apiClient";
import {commentsActions} from "../actions";

export const addCommentThunkCreator = (id,comment) => async dispatch => {
    const {data: response} = await apiClient.post(`posts/${id}/comments`, comment);

    dispatch(commentsActions.addComment(response));
};

export const deleteCommentThunkCreator = (id) => async dispatch => {
    const {data: response} = await apiClient.delete(`comments/${id}`);

    dispatch(commentsActions.removeComment(id));
};