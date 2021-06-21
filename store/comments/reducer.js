import {createCommentAsync, deleteCommentAsync, getCommentsAsync, updateCommentAsync} from "./actions";

const initialState = {
    comments: [],
    nextCursor: '',
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case getCommentsAsync.toString():
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                comments: [...state.comments, ...action.payload.comments],
                nextCursor: action.payload.nextCursor
            };

        case createCommentAsync.toString():
            if (!action.payload) return state;

            return {...state, comments: [action.payload, ...state.comments]};


        case deleteCommentAsync.toString():
            if (!action.payload) return state;

            return {...state, comments: state.comments.filter(comment => comment.id !== action.payload)};

        case updateCommentAsync.toString():
            if (!action.payload) return state;

            return {
                ...state, comments: state.comments
                    .map(comment => comment.id === action.payload.id ? action.payload : comment)
            };


        default:
            return state;
    }
};