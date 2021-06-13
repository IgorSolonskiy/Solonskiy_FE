import {postsActionTypes} from "../posts/actions";

export const commentsActionTypes = {
  SET_COMMENT: "COMMENTS.SET_COMMENT",
  DELETE_COMMENT: "COMMENTS.DELETE_COMMENT",
  UPDATE_COMMENT: "COMMENTS.UPDATE_COMMENT",
};

export const createCommentAsync = (id, comment) => ({
  type: commentsActionTypes.SET_COMMENT,
  request: {
    url: `posts/${id}/comments`,
    params: comment,
    method: "post",
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POST]: {
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
  type: commentsActionTypes.DELETE_COMMENT,
  request: {
    url: `comments/${id}`,
    method: "delete",
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POST]: {
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

export const updateCommentAsync = (id, comment) => ({
  type: commentsActionTypes.UPDATE_COMMENT,
  request: {
    url: `comments/${id}`,
    params: comment,
    method: "put",
  },
  meta: {
    mutations: {
      [postsActionTypes.GET_POST]: {
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