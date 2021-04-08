import Link from "next/link";
import Btn from "../btn/Btn";

export default function Post({post, onDelete, user}) {
    return (
        <div className='d-flex align-items-center position-relative'>
            <Link href={`/post/${post.id}`}>
                <li className="list-group-item w-100 list-group-item-active">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold">{post.user_email}</div>
                        <div className="fw-bold">{post.title}</div>
                        {post.content}
                    </div>
                </li>
            </Link>
            {post.user_email === user.email ?
                <Btn name='&times;'
                     classBtn='badge bg-primary rounded-pill d-block position-absolute end-0'
                     onClick={() => onDelete(post)}
                     typeBtn='button'/>
                : ''}
        </div>
    )
}
