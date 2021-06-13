import Comment from "../comment/Comment";
import {useQuery} from "@redux-requests/react";
import {getPost} from "../../store/posts/actions";

export default function CommentsList({onDelete, onSubmit}) {
  const {data: {comments}} = useQuery(getPost());

  return (
      <ul className="ps-5 list-group list-group-flush w-100 mb-3 mt-3 vh-100">
        {comments.map(comment => <Comment key={comment.id}
                                          onSubmit={onSubmit}
                                          onDelete={onDelete}
                                          comment={comment}/>)}
      </ul>
  );
}