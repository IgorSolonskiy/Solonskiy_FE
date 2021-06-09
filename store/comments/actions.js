import {metaDataByPaginate} from "./requestConfig";

export const commentsActionTypes = {
  SET_COMMENTS_LIST: "COMMENTS.SET_COMMENTS_LIST",
  ADD_COMMENT: "COMMENTS.ADD_COMMENT",
  REMOVE_COMMENT: "COMMENTS.REMOVE_COMMENT",
  CHANGE_COMMENT: "COMMENTS.CHANGE_COMMENT",
};

export const setCommentsList = () => ({
  type: commentsActionTypes.SET_COMMENTS_LIST,
});

export const setCommentsListAsync = (id, cursor = "") => ({
  type: commentsActionTypes.SET_COMMENTS_LIST,
  request: {
    url: `posts/${id}/comments?cursor=${cursor}`,
  },
  meta: metaDataByPaginate
});

export const addCommentAsync = (id, comment) => ({
  type: commentsActionTypes.ADD_COMMENT,
  request: {
    url: `posts/${id}/comments`,
    params: comment,
    method: "post",
  },
  meta: {
    mutations: {
      [commentsActionTypes.SET_COMMENTS_LIST]: {
        updateData: (prevState, comment) => {
          return {
            ...prevState,
            comments: [...prevState.comments, comment],
          };
        },
      },
    },
  },
});

export const deleteCommentAsync = (id) => ({
  type: commentsActionTypes.REMOVE_COMMENT,
  request: {
    url: `comments/${id}`,
    method: "delete",
  },
  meta: {
    mutations: {
      [commentsActionTypes.SET_COMMENTS_LIST]: {
        updateData: (prevState) => {
          return {
            ...prevState,
            comments: prevState.comments.filter(comment => comment.id !== id),
          };
        },
      },
    },
  },
});

export const changeCommentAsync = (id, comment) => ({
  type: commentsActionTypes.CHANGE_COMMENT,
  request: {
    url: `comments/${id}`,
    params: comment,
    method: "put",
  },
  meta: {
    mutations: {
      [commentsActionTypes.SET_COMMENTS_LIST]: {
        updateData: (prevState, changedPost) => {
          return {
            ...prevState,
            comments: prevState.comments.map(
                comment => comment.id === id ? changedPost : comment),
          };
        },
      },
    },
  },
});