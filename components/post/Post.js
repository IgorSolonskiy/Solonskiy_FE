import Link from "next/link";

export default function Post( {post, onDelete}) {
    return (
        <li className="posts__item">
            <Link href={`/post/${post.id}`}>
                <div className="posts__user">
                    <div className="posts__profile">
                        <span className="posts__name">{post.title}</span>
                    </div>
                    <p className="posts__text">{post.content}</p>
                </div>
            </Link>
            <span className="posts__btn-del" onClick={()=>onDelete(post)}>&times;</span>
        </li>
    )
}
