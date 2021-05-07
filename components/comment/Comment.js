import {useSelector} from "react-redux";
import Btn from "../btn/Btn";

export default function Comment({comment, onDelete}) {
    const {user} = useSelector((state) => state.user)
    const {profile} = useSelector((state) => state.profile)

    return (
        <li className='d-flex align-items-center position-relative border list-group-item list-group-item-action'>
                <div className="w-100">
                    <div className='text-uppercase fw-bold text-info'>comment</div>
                    <div className=" ms-2 me-auto">
                        <div className="fw-bold mt-2 w-100 text-center text-uppercase ">{comment.author.username}</div>
                        <p className="mt-3">{comment.content}</p>
                    </div>
                </div>
            {(!user.id ||profile.id === comment.author.id ) &&
                <Btn name='Delete'
                     type='button'
                     classBtn=' btn btn-outline-danger position-absolute end-0'
                     onClick={() => onDelete(comment)}/>
                }
        </li>
    )
}
