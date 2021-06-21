import Post from "../post/Post";

import {useSelector} from "react-redux";

export default function PostsList({onDelete, onChange}) {
    const posts = useSelector(state => state.posts.posts)

    return (
        <ul className="list-group list-group-flush w-100 vh-100 px-3 mb-3 mt-3 border-top">
            {posts && posts.map(post => <Post key={post.id}
                                              post={post}
                                              onChange={onChange}
                                              onDelete={onDelete}
            />)}
        </ul>
    );
}