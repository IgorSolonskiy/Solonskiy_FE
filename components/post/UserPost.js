import Link from "next/link";
import Btn from "../btn/Btn";

export default function userPost({post}) {
    return (
        <li className='d-flex align-items-center position-relative w-100 list-group-item list-group-item-action'>
            <div className="w-100">
                <div className=" ms-2 me-auto">
                    <div className="fw-bold mt-2 w-100 text-center text-uppercase ">{post.author.user_name}</div>
                    <div className="fw-bold mt-2 w-100">{post.title}</div>
                    <p className="mt-3">{post.content}</p>
                </div>
            </div>
        </li>
    );
}
