import Link from "next/link";
import Btn from "../btn/Btn";

export default function Post({post, onDelete, user}) {
    return (
        <li className='d-flex align-items-center position-relative list-group-item w-100 list-group-item'>
            <Link href={`/post/${post.id}`}>
                <div className="w-100">
                    <div className="ms-2 me-auto">
                        <div className="fw-bold w-100 text-end">{post.user_email}</div>
                        <div className="fw-bold mt-2 w-100 text-center">{post.title}</div>
                        {post.content}
                    </div>
                </div>
            </Link>
            {post.user_email === user.email ?
                <Btn name='&times;'
                     classBtn='badge bg-primary rounded-pill d-block position-absolute end-0'
                     onClick={() => onDelete(post)}
                     typeBtn='button'/>
                : ''}
        </li>
    )
}
