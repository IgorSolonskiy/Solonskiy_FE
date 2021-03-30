import Link from "next/link";

export default function Post({content, title, id, onDelete}) {
    return (
        <li className="posts__item">
            <Link href={`/post/${id}`}>
                <div className="posts__user">
                    <div className="posts__profile">
                        <span className="posts__name">{title}</span>
                    </div>
                    <p className="posts__text">{content}</p>
                </div>
            </Link>
            <span className="posts__btn-del" onClick={()=>onDelete(id)}>&times;</span>
        </li>
    )
}
