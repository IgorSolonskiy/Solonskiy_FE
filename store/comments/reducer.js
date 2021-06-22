import {createCommentAsync, deleteCommentAsync, getCommentsAsync, updateCommentAsync} from "./actions";

const initialState = {
    preloadComments: [],
    comments: [],
    nextCursor: '',
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case getCommentsAsync.toString():
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                ...state,
                comments: [...state.comments, ...action.payload.comments],
                nextCursor: action.payload.nextCursor
            };

        case createCommentAsync.toString():
            if (!action.payload) return state;

            return {...state, comments: [...state.comments, action.payload].sort((a, b) => a.id - b.id)};


        case deleteCommentAsync.toString():
            if (!action.payload) return state;

            return {...state, comments: state.comments.filter(comment => comment.id !== action.payload)};

        case updateCommentAsync.toString():
            if (!action.payload) return state;

            return {
                ...state, comments: state.comments
                    .map(comment => {

                        if (comment.id === action.payload.id) {
                            comment.content = action.payload.content
                            action.payload.mentionedUsers ? comment.mentionedUsers = action.payload.mentionedUsers : comment.mentionedUsers;
                            action.payload.hashtags ? comment.hashtags = action.payload.hashtags : comment.hashtags;
                        }

                        return comment
                    })
            };

        case createCommentAsync.toString() + "PRELOAD":
            if (!action.payload) return state;

            return {...state, preloadComments: [action.payload, ...state.preloadComments]};

        case createCommentAsync.toString() + "REMOVE_PRELOAD":
            return {...state, preloadComments: []};


        default:
            return state;
    }
};