import {useSelector} from "react-redux";
import Comment from "../comment/Comment";

export default function CommentsList({onDelete, onSubmit}) {
    const {comments} = useSelector((state) => state.comments)

    return (
        <ul className="list-group w-100 mt-3">
            {comments.map(comment => <Comment key={comment.id}
                                              onSubmit={onSubmit}
                                              onDelete={onDelete}
                                              comment={comment}/>)}
        </ul>
    )
}