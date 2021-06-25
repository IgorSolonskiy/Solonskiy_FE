import {useSelector} from "react-redux";

import Comment from "../comment/Comment";
import PreloadComment from "../comment/PreloadComment";

export default function CommentsList({onDelete, onSubmit, onLike, onUnlike}) {
    const comments = useSelector(state => state.comments.comments);
    const preloadComments = useSelector(state => state.comments.preloadComments);
    const preload = preloadComments.length ?
        preloadComments.map((comment, index) =>
            <PreloadComment key={`${comment.content + index}`} comment={comment}/>)
        : ''

    return (
        <ul className="ps-5 list-group list-group-flush w-100 mb-3 mt-3 vh-100">
            {comments.map(comment => <Comment key={comment.id}
                                              onUnlike={onUnlike}
                                              onLike={onLike}
                                              onSubmit={onSubmit}
                                              onDelete={onDelete}
                                              comment={comment}/>)}
            {preload}
        </ul>
    );
}