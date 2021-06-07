import { commentsActionTypes } from "./actions";
import { postsActionTypes } from "../posts";

const initialState = {
  comments: [],
  pagination: {
    cursor: null
  },
  fetching: false,
  idComment: null,
};

export const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case commentsActionTypes.SET_COMMENTS_LIST:
      return {
        ...state, comments: [...state.comments, ...action.payload.data],
        pagination: {
          ...state.pagination,
          cursor: action.payload.links.next && action.payload.links.next.match(/cursor=(\w+)/)[1]
        }
      };

    case postsActionTypes.SET_FETCHING:
      return { ...state, fetching: action.payload };

    case commentsActionTypes.ADD_COMMENT:
      return state.pagination.cursor ? state : { ...state, comments: [...state.comments, action.payload] };

    case commentsActionTypes.REMOVE_COMMENT:
      return { ...state, comments: state.comments.filter(comment => comment.id !== action.payload) };

    case commentsActionTypes.CHANGE_COMMENT:
      return {
        ...state, comments: [...state.comments
          .map(comment => comment.id === action.payload.id ? action.payload : comment)]
      };

    default:
      return state;
  }
};
