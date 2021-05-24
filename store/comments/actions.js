import apiServer from "../../libs/apiServer";
import apiClient from "../../libs/apiClient";

export const commentsActionTypes = {
  SET_COMMENTS_LIST: "COMMENTS.SET_COMMENTS_LIST",
  ADD_COMMENT: "COMMENTS.ADD_COMMENT",
  REMOVE_COMMENT: "COMMENTS.REMOVE_COMMENT",
  CHANGE_COMMENT: "COMMENTS.CHANGE_COMMENT",
};

export const setCommentsList = (payload) => ({ type: commentsActionTypes.SET_COMMENTS_LIST, payload });
export const addComment = (payload) => ({ type: commentsActionTypes.ADD_COMMENT, payload });
export const removeComment = (payload) => ({ type: commentsActionTypes.REMOVE_COMMENT, payload });
export const changeComment = (payload) => ({ type: commentsActionTypes.CHANGE_COMMENT, payload });

export const setCommentsListAsync = (id) => async dispatch => {
  const { data: response } = await apiServer.get(`posts/${id}/comments`);

  dispatch(setCommentsList(response));
};

export const addCommentAsync = (id, comment) => async dispatch => {
  const { data: response } = await apiClient.post(`posts/${id}/comments`, comment);

  dispatch(addComment(response));
};

export const deleteCommentAsync = (id) => async dispatch => {
  await apiClient.delete(`comments/${id}`);
  dispatch(removeComment(id));
};

export const changeCommentAsync = (id, comment) => async dispatch => {
  const { data: response } = await apiClient.put(`comments/${id}`, comment);
  dispatch(changeComment(response));
};