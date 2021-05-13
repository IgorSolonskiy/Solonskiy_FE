import Link from "next/link";
import Btn from "../btn/Btn";
import {useSelector} from "react-redux";
import FormComments from "../forms/FormComments";

export default function Post({post, onDelete, onSubmit, createComment = false}) {
    const {profile} = useSelector((state) => state.profile)
    const {postId} = useSelector((state) => state.posts)

    return (
        <li className='d-flex align-items-center position-relative w-100 list-group-item list-group-item-action'>
            <div className='d-flex flex-column w-100'>
                <Link href={`/post/${post.id}`}>
                    <div className="w-100">
                        <div className=" ms-2 me-auto">
                            <div className="fw-bold mt-2 w-100 text-center text-uppercase ">{post.author.username}</div>
                            <div className="fw-bold mt-2 w-100">{post.title}</div>
                            <p className="mt-3">{post.content}</p>
                        </div>
                    </div>
                </Link>
                {postId &&
                <div className='w-100 d-flex justify-content-center'>
                    <FormComments onSubmit={onSubmit} />
                </div>
                }
            </div>
                {post.author.id === profile.id ?
                    <Btn name='&times;'
                         type='button'
                         classBtn='badge bg-primary rounded-pill d-block position-absolute end-0'
                         onClick={() => onDelete(post)}/>
                    : ''}
        </li>
    )
}
