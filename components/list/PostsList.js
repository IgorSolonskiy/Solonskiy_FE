import Post from "../post/Post";

import {useSelector} from "react-redux";
import PreloadPost from "../post/PreloadPost";

export default function PostsList({onDelete, onChange, onLike, onUnlike}) {
    const posts = useSelector(state => state.posts.posts);
    const preloadPosts = useSelector(state => state.posts.preloadPosts)
    const preload = preloadPosts.length ? preloadPosts.map((post, index) =>
        <PreloadPost key={`${post.content + index}`} content={post.content}/>) : '';

    return (
        <ul className="list-group list-group-flush w-100 vh-100 px-3 mb-3 mt-3 border-top">
            {preload}
            {posts && posts.map(post => <Post key={post.id}
                                              post={post}
                                              onChange={onChange}
                                              onDelete={onDelete}
                                              onLike={onLike}
                                              onUnlike={onUnlike}
            />)}
        </ul>
    );
}