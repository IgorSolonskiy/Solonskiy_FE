import {createPostAsync, deletePostAsync, getPostsFeedAsync, updatePostAsync} from "./actions";

const initialState = {
    preloadPosts: [],
    posts: [],
    nextCursor: '',
};

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case getPostsFeedAsync.toString():
            if (!action.payload || state.nextCursor === action.payload.nextCursor) return state;

            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts],
                nextCursor: action.payload.nextCursor
            };

        case createPostAsync.toString():
            if (!action.payload) return state;

            return {...state, posts: [action.payload, ...state.posts].sort((a, b) => b.id - a.id)};


        case deletePostAsync.toString():
            if (!action.payload) return state;

            return {...state, posts: state.posts.filter(post => post.id !== action.payload)};

        case updatePostAsync.toString():
            if (!action.payload) return state;

            return {
                ...state, posts: state.posts
                    .map(post => {

                        if (post.id === action.payload.id) {
                            post.content = action.payload.content
                            action.payload.mentionedUsers ? post.mentionedUsers = action.payload.mentionedUsers : post.mentionedUsers;
                            action.payload.hashtags ? post.hashtags = action.payload.hashtags : post.hashtags;
                        }

                        return post
                    })
            };

        case createPostAsync.toString() + 'PRELOAD':
            if (!action.payload) return state;

            return {...state, preloadPosts: [action.payload, ...state.preloadPosts]};

        case createPostAsync.toString() + 'REMOVE_PRELOAD':
            return {...state, preloadPosts: []};


        default:
            return state;
    }
};