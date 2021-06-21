import {commentsActionTypes} from "./actions";

const initialState = {
    comments: [],
    nextCursor: '',
};

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case commentsActionTypes.GET_COMMENTS:
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                comments: [...state.comments, ...action.payload.comments],
                nextCursor: action.payload.nextCursor
            };

        case commentsActionTypes.SET_COMMENT:
            if (!action.payload) return state;

            return {...state, comments: [action.payload,...state.comments]};


        case commentsActionTypes.DELETE_COMMENT:
            if (!action.payload) return state;

            return {...state, comments: state.comments.filter(comment => comment.id !== action.payload)};

        case commentsActionTypes.UPDATE_COMMENT:
            if (!action.payload) return state;

            return {
                ...state, comments: state.comments
                    .map(comment => comment.id === action.payload.id ? action.payload : comment)
            };


        default:
            return state;
    }
};