import Link from "next/link";

export default function Post({date , postText, postId, onClick}) {


    return (
        <li  className="posts__item">
            <Link href={`/post/${postId}`}><a className="posts__link">
                <div className="posts__user">
                    <span className="posts__name">User name</span>
                    <span className="posts__date">{new Date(date).getFullYear()}</span>
                </div>
                <p className="posts__text">{postText}</p></a></Link>
            <span className="posts__btn-del" onClick={()=>onClick(postId)}>&times;</span>
        </li>
    )
}