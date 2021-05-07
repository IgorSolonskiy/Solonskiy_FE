import {commentsActionTypes} from "./actions";

const initialState = {
    comments: []
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case commentsActionTypes.ADD_COMMENTS_LIST:
            return {...state, comments: [...action.payload]}

        case commentsActionTypes.ADD_COMMENT:
            return {...state, comments: [...state.comments, action.payload]}

        case commentsActionTypes.REMOVE_COMMENT:
            return {...state, comments: state.comments.filter(comment=>comment.id !== action.payload)}

        default:
            return state
    }
}