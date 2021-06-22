import Comment from "../comment/Comment";
import {useSelector} from "react-redux";
import PreloadComment from "../comment/PreloadComment";

export default function CommentsList({onDelete, onSubmit}) {
    const comments = useSelector(state => state.comments.comments);
    const preloadComments = useSelector(state => state.comments.preloadComments);
    const preload = preloadComments.length ? preloadComments.map(comment => <PreloadComment key={`${comment.content + new Date().getTime()}`} comment={comment}/>) : ''

    return (
        <ul className="ps-5 list-group list-group-flush w-100 mb-3 mt-3 vh-100">
            {comments.map(comment => <Comment key={comment.id}
                                              onSubmit={onSubmit}
                                              onDelete={onDelete}
                                              comment={comment}/>)}
            {preload}
        </ul>
    );
}