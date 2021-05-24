import { combineReducers } from "redux";
import { postsReducer as posts } from "./posts";
import { userReducer as users } from "./user";
import { profileReducer as profile } from "./profile";
import { commentsReducer as comments } from "./comments";

export const reducers = combineReducers({
  posts,
  users,
  profile,
  comments
});
