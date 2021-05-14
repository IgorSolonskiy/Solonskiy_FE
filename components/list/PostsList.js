import {useSelector} from "react-redux";
import Post from "../post/Post";

export default function PostsList({onDelete}) {
    const {posts} = useSelector((state) => state.posts)

    return (
        <ul className="list-group list-group-flush w-100 vh-100 px-3 mb-3 mt-3 border-top" style={{overflowY: "scroll"}}>
            {posts.map(post => <Post key={post.id} post={post} onDelete={onDelete}/>)}
        </ul>
    )
}