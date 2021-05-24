import { useSelector } from "react-redux";
import Post from "../post/Post";

export default function PostsList ({ onDelete, onChange, showControls = false }) {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <ul className="list-group list-group-flush w-100 vh-100 px-3 mb-3 mt-3 border-top"
        style={{ overflowY: "scroll" }}>
      {posts.map(post => <Post key={post.id}
                               post={post}
                               onChange={onChange}
                               showControls={showControls}
                               onDelete={onDelete}
      />)}
    </ul>
  );
}