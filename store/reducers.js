import {combineReducers} from "redux";
import {postsReducer as posts} from "./posts";
import {userReducer as user} from "./user";
import {profileReducer as profile} from "./profile";

export const reducers = combineReducers({
    posts,
    user,
    profile
})
