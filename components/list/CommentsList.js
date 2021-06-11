import { useSelector } from "react-redux";
import Comment from "../comment/Comment";
import {getQuerySelector} from "@redux-requests/core";
import {getComments} from "../../store/comments/actions";

export default function CommentsList ({ onDelete, onSubmit }) {
  const {data: {comments}} = useSelector(getQuerySelector(getComments()));

  return (
    <ul className="ps-5 list-group list-group-flush w-100 mb-3 mt-3 vh-100">
      {comments.map(comment => <Comment key={comment.id}
                                        onSubmit={onSubmit}
                                        onDelete={onDelete}
                                        comment={comment}/>)}
    </ul>
  );
}