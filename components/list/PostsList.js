import {useSelector} from "react-redux";
import {setPostsList} from "../../store/posts/actions";
import {getQuerySelector} from "@redux-requests/core";

import Post from "../post/Post";

export default function PostsList({onDelete, onChange}) {
  const {data: {posts}} = useSelector(getQuerySelector(setPostsList()));

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