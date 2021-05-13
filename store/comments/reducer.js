import {commentsActionTypes} from "./actions";

const initialState = {
    comments: [],
    idComment: null,
}

export const commentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case commentsActionTypes.SET_COMMENTS_LIST:
            return {...state, comments: [...action.payload]}

        case commentsActionTypes.ADD_COMMENT:
            return {...state, comments: [...state.comments, action.payload]}

        case commentsActionTypes.REMOVE_COMMENT:
            return {...state, comments: state.comments.filter(comment=>comment.id !== action.payload)}

        case commentsActionTypes.CHANGE_COMMENT:

            return {...state, comments: [...state.comments.map(comment=>{
                if(comment.id === action.payload.id){
                    comment = action.payload;
                }
                return comment;
                })]}

        case commentsActionTypes.SET_ID_COMMENT:
            return {...state, idComment: action.payload}

        default:
            return state
    }
}