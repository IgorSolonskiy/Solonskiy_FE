import {postsActionTypes} from "./actions";

const initialState = {
  posts: [],
  pagination: {
    nextPage:null,
  },
  fetching: false,
  post: null,
  postId: null,
};

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {

    case postsActionTypes.SET_POSTS_LIST:
      return {
        ...state, posts: [...state.posts, ...action.payload.data],
        pagination: {
          ...state.pagination,
          nextPage: action.payload.links.next &&
              action.payload.links.next.match(/page=(\w+)/)[1],
        },
      };

    case postsActionTypes.SET_POSTS_TAG:

      return {
        ...state,
        posts: [...state.posts, ...action.payload.data],
        pagination: {
          ...state.pagination,
          nextPage: action.payload.links.next &&
              action.payload.links.next.match(/page=(\w+)/)[1],
        },
      };

    case postsActionTypes.SET_FETCHING:
      return {...state, fetching: action.payload};

    case postsActionTypes.ADD_ONE_POST_LIST:
      return state.posts.length >= state.pagination.total ? state : {
        ...state,
        posts: [...state.posts, action.payload],
      };

    case postsActionTypes.SET_POST:
      return {...state, post: action.payload};

    case postsActionTypes.SET_POST_ID:
      return {...state, postId: action.payload};

    case postsActionTypes.REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      };

    case postsActionTypes.CHANGE_POST:
      return {
        ...state,
        post: action.payload,
        posts: state.posts.map(
            post => post.id === action.payload.id ? action.payload : post),
      };

    default:
      return state;
  }
};
