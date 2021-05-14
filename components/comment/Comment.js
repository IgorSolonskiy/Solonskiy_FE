import {useSelector} from "react-redux";

import FormComments from "../forms/FormComments";
import Image from "next/image";
import Btn from "../btn/Btn";

export default function Comment({comment, onDelete, onChange, onSubmit}) {
    const {profile} = useSelector(state => state.profile);
    const {idComment} = useSelector(state => state.comments);
    const {user} = useSelector(state => state.users);

    return (
        <li className='d-flex align-items-center position-relative border
        card border-secondary list-group-item list-group-item-action '>
            <div className="w-100">
                <div className=" ms-2 me-auto">
                    <div className='d-flex justify-content-center'>
                        <Image src={comment.author.avatar ?? '../defaultAvatar.png'} width={40} height={40}
                               className='rounded-circle'/>
                        <div
                            className="fw-bold mt-2 mx-3 text-center text-uppercase card-header p-0">
                            {comment.author.username}
                        </div>
                    </div>
                    <p className="mt-3 mb-0">{comment.content}</p>
                </div>
            </div>
            {
                (!user || profile.id === comment.author.id) &&
                <div className='w-100 d-flex justify-content-end align-items-center'>
                    {
                        idComment === comment.id
                            ? <FormComments onSubmit={onSubmit} comment={comment}/>
                            : ''
                    }
                    {
                        profile.id === comment.author.id &&
                        <Btn name='Change'
                             type='button'
                             onClick={() => onChange(comment)}
                             classBtn=' btn btn-outline-info btn-sm ms-3'/>
                    }
                    <Btn name='Delete'
                         type='button'
                         classBtn=' btn btn-outline-danger btn-sm ms-3'
                         onClick={() => onDelete(comment)}/>
                </div>
            }
        </li>
    )
}
