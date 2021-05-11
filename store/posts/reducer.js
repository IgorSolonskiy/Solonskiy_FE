import {postsActionTypes} from "./actions";

const initialState = {
    posts: [],
    post: null
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case postsActionTypes.SET_POSTS_LIST:
            return {...state, posts: [...action.payload]}

        case postsActionTypes.ADD_ONE_POST_LIST:
            return {...state, posts: [...state.posts, action.payload]}

        case postsActionTypes.SET_POST:
            return {...state, post: action.payload}

        case postsActionTypes.REMOVE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.payload)}

        case postsActionTypes.CHANGE_POST:
            return {...state, post: action.payload}

        default:
            return state
    }
}