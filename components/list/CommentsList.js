import {useSelector} from "react-redux";
import Comment from "../comment/Comment";

export default function CommentsList({onDelete}) {
    const {comments} = useSelector((state) => state.comments)

    return (
        <ul className="ps-5 list-group list-group-flush w-100 mt-3">
            {comments.map(comment => <Comment key={comment.id} onDelete={onDelete} comment={comment}/>)}
        </ul>
    )
}