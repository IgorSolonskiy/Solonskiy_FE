import {useSelector} from "react-redux";
import Post from "../post/Post";

export default function PostsList({onDelete}) {
    const {posts} = useSelector((state) => state.posts)

    return (
        <ul className="list-group list-group-flush w-75 mt-3">
            {posts.map(post => <Post key={post.id} post={post} onDelete={onDelete}/>)}
        </ul>
    )
}