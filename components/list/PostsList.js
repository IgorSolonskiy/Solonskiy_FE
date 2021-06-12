import {getPosts} from "../../store/posts/actions";
import {useQuery} from "@redux-requests/react";

import Post from "../post/Post";

export default function PostsList({onDelete, onChange}) {
  const {data: {posts}} = useQuery(getPosts());

  return (
      <ul className="list-group list-group-flush w-100 vh-100 px-3 mb-3 mt-3 border-top">
        {posts.map(post => <Post key={post.id}
                                 post={post}
                                 onChange={onChange}
                                 onDelete={onDelete}
        />)}
      </ul>
  );
}