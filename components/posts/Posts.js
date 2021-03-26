import Post from "./Post";

export default function Posts({posts, onClick}) {
    return (
        <ul className="posts">
            {posts.map(({text, created_at, id}) => <Post key={id} postText={text} onClick={onClick} date={created_at}
                                                         postId={id}/>)}
        </ul>
    )
}