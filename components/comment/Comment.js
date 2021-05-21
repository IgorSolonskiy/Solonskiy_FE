import {Avatar} from "../image/Avatar";
import {useState} from "react";
import {useSelector} from "react-redux";

import Link from "next/link";
import Btn from "../btn/Btn";
import EditCommentForm from "../forms/EditCommentForm";

export default function Comment({comment, onDelete, onSubmit}) {
    const {profile} = useSelector(state => state.profile);
    const {user} = useSelector(state => state.users);
    const [editing, setEditing] = useState(false);

    const content = editing ?
        <EditCommentForm setEditing={setEditing} onSubmit={onSubmit} comment={comment}/>
        :
        <p className="mt-3 mb-0">{comment.content}</p>;

    const changeComment = profile.id === comment.author.id &&
        <Btn name='Change' type='button' onClick={() => setEditing(!editing)}
             classBtn='btn btn-outline-info btn-sm ms-3'/>;

    const controls = (!user || profile.id === comment.author.id) ?
        <div className='w-100 d-flex justify-content-end align-items-center'>
            {changeComment}
            <Btn name='Delete'
                 type='button'
                 classBtn=' btn btn-outline-danger btn-sm ms-3'
                 onClick={() => onDelete(comment)}/>
        </div>
        : null;


    return (
        <li className='d-flex align-items-center position-relative border p-2 mb-3 card border-secondary '>
            <div className="w-100">
                <div className=" ms-2 me-auto">
                    <div className='d-flex justify-content-center'>
                        <Avatar avatar={comment.author.avatar} name={comment.author.name} size={40}/>
                        <Link href={`../users/${comment.author.username}`}>
                            <div
                                className=" btn fw-bold mt-2 mx-3 text-center text-uppercase card-header p-0">
                                {comment.author.username}
                            </div>
                        </Link>
                    </div>
                    {content}
                </div>
            </div>
            {controls}
        </li>
    )
}
