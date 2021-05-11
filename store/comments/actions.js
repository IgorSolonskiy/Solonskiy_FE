import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const commentsActionTypes = {
    SET_COMMENTS_LIST: 'COMMENTS.SET_COMMENTS_LIST',
    ADD_COMMENT: 'COMMENTS.ADD_COMMENT',
    REMOVE_COMMENT: 'COMMENTS.REMOVE_COMMENT',
    CHANGE_COMMENT: 'COMMENTS.CHANGE_COMMENT',
    SET_ID_COMMENT: 'ID.SET_ID_COMMENT',
}

export const commentsActions = {
    setCommentsList: (payload) => ({type: commentsActionTypes.SET_COMMENTS_LIST, payload}),
    addComment: (payload) => ({type: commentsActionTypes.ADD_COMMENT, payload}),
    removeComment: (payload) => ({type: commentsActionTypes.REMOVE_COMMENT, payload}),
    changeComment: (payload) => ({type: commentsActionTypes.CHANGE_COMMENT, payload}),
    setIdComment: (payload) => ({type: commentsActionTypes.SET_ID_COMMENT, payload}),
}

export const setCommentsListAsync = (id) => async dispatch => {
    const {data: response} = await apiServer.get(`posts/${id}/comments`);

    dispatch(commentsActions.setCommentsList(response));
};

export const addCommentAsync = (id,comment) => async dispatch => {
    const {data: response} = await apiClient.post(`posts/${id}/comments`, comment);

    dispatch(commentsActions.addComment(response));
};

export const deleteCommentAsync = (id) => async dispatch => {
    await apiClient.delete(`comments/${id}`);
    dispatch(commentsActions.removeComment(id));
};

export const changeCommentAsync = (id,comment) => async dispatch => {
    const {data: response} = await apiClient.put(`comments/${id}`, comment);
    dispatch(commentsActions.changeComment(response));
};