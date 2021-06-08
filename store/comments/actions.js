import apiClient from "../../libs/apiClient";
import {postsActionTypes} from "../posts";

export const commentsActionTypes = {
  SET_COMMENTS_LIST: "COMMENTS.SET_COMMENTS_LIST",
  ADD_COMMENT: "COMMENTS.ADD_COMMENT",
  REMOVE_COMMENT: "COMMENTS.REMOVE_COMMENT",
  CHANGE_COMMENT: "COMMENTS.CHANGE_COMMENT",
  SET_FETCHING: "COMMENTS.SET_FETCHING",
};

export const setCommentsList = (payload) => ({
  type: commentsActionTypes.SET_COMMENTS_LIST,
  payload,
});
export const addComment = (payload) => ({
  type: commentsActionTypes.ADD_COMMENT,
  payload,
});
export const removeComment = (payload) => ({
  type: commentsActionTypes.REMOVE_COMMENT,
  payload,
});
export const changeComment = (payload) => ({
  type: commentsActionTypes.CHANGE_COMMENT,
  payload,
});
export const setFetching = (payload) => ({
  type: postsActionTypes.SET_FETCHING,
  payload,
});

export const setCommentsListAsync = (id, cursor) => async dispatch => {
  try {
    dispatch(setFetching(true));

    const {data: response} = await apiClient.get(
        `posts/${id}/comments?cursor=${cursor}`);

    dispatch(setCommentsList(response));
  } finally {
    dispatch(setFetching(false));
  }
};

export const addCommentAsync = (id, comment) => async dispatch => {
  const {data: response} = await apiClient.post(`posts/${id}/comments`,
      comment);

  dispatch(addComment(response));
};

export const deleteCommentAsync = (id) => async dispatch => {
  await apiClient.delete(`comments/${id}`);
  dispatch(removeComment(id));
};

export const changeCommentAsync = (id, comment) => async dispatch => {
  const {data: response} = await apiClient.put(`comments/${id}`, comment);
  dispatch(changeComment(response));
};