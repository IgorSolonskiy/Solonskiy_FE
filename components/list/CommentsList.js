import {useSelector} from "react-redux";
import Comment from "../comment/Comment";

export default function CommentsList({onDelete, onChange, onSubmit}) {
    const {comments} = useSelector((state) => state.comments)

    return (
        <ul className="ps-5 list-group list-group-flush w-100 mb-3 mt-3 vh-100" style={{overflowY: "scroll"}}>
            {comments.map(comment => <Comment key={comment.id}
                                              onChange={onChange}
                                              onSubmit={onSubmit}
                                              onDelete={onDelete}
                                              comment={comment}/>)}
        </ul>
    )
}