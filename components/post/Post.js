import Link from "next/link";
import Button from "../btn/Button";

export default function Post({post, onDelete, user}) {

    return (
        <li className='d-flex align-items-center position-relative w-100 list-group-item list-group-item-action'>
            <Link href={`/post/${post.id}`}>
                <div className="w-100">
                    <div className=" ms-2 me-auto">
                        <div className="fw-bold mt-2 w-100 text-center text-uppercase ">{post.author.name}</div>
                        <div className="fw-bold mt-2 w-100">{post.title}</div>
                        <p className="mt-3">{post.content}</p>
                    </div>
                </div>
            </Link>
            {post.author.id === user.id ?
                <Button name='&times;'
                        classBtn='badge bg-primary rounded-pill d-block position-absolute end-0'
                        onClick={() => onDelete(post)}
                        typeBtn='button'/>
                : ''}
        </li>
    )
}
