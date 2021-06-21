import {createPostAsync, deletePostAsync, getPostsAsync, updatePostAsync} from "./actions";

const initialState = {
    posts: [],
    nextCursor: '',
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case getPostsAsync.toString():
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                posts: [...state.posts, ...action.payload.posts],
                nextCursor: action.payload.nextCursor
            };

        case createPostAsync.toString():
            if (!action.payload) return state;

            return {...state, posts: [action.payload,...state.posts]};


        case deletePostAsync.toString():
            if (!action.payload) return state;

            return {...state, posts: state.posts.filter(post => post.id !== action.payload)};

        case updatePostAsync.toString():
            if (!action.payload) return state;

            return {
                ...state, posts: state.posts
                    .map(post => post.id === action.payload.id ? action.payload : post)
            };


        default:
            return state;
    }
};