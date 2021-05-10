import apiClient from "../../../libs/apiClient";
import {commentsActions} from "../actions";
import apiServer from "../../../libs/apiServer";

export const addCommentsListThunkCreator = (id) => async dispatch => {
    const {data: response} = await apiServer.get(`posts/${id}/comments`);

    dispatch(commentsActions.addCommentsList(response));
};

export const addCommentThunkCreator = (id,comment) => async dispatch => {
    const {data: response} = await apiClient.post(`posts/${id}/comments`, comment);

    dispatch(commentsActions.addComment(response));
};

export const deleteCommentThunkCreator = (id) => async dispatch => {
    await apiClient.delete(`comments/${id}`);
    dispatch(commentsActions.removeComment(id));
};