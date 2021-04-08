import Link from "next/link";
import Btn from "../btn/Btn";

export default function Post({post, onDelete, user}) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start">
            <Link href={`/post/${post.id}`}>
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{post.user_email}</div>
                    <div className="fw-bold">{post.title}</div>
                    {post.content}
                </div>
            </Link>
            {post.user_email === user.email ?
                <Btn name='&times;'
                     classBtn='badge bg-primary rounded-pill d-block'
                     onClick={() => onDelete(post)}
                     typeBtn='button'/>
                     : ''}
        </li>
    )
}
