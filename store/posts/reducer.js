import {postsActionTypes} from "./actions";

const initialState = {
    posts: [],
    nextCursor: '',
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postsActionTypes.GET_POSTS:
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                posts: [...state.posts, ...action.payload.posts],
                nextCursor: action.payload.nextCursor
            };

        case postsActionTypes.SET_POST:
            if (!action.payload) return state;

            return {...state, posts: [action.payload,...state.posts]};


        case postsActionTypes.DELETE_POST:
            if (!action.payload) return state;

            return {...state, posts: state.posts.filter(post => post.id !== action.payload)};

        case postsActionTypes.UPDATE_POST:
            if (!action.payload) return state;

            return {
                ...state, posts: state.posts
                    .map(post => post.id === action.payload.id ? action.payload : post)
            };


        default:
            return state;
    }
};