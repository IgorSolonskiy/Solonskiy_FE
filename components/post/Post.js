import Link from "next/link";
import {deletePost} from "../../gateway/postsGateway";
import PropTypes from "prop-types";

export default function Post({content, title, id, onDelete}) {
    const handleDeleteClick = async () => {
        await  deletePost(`posts/${id}`);
        onDelete(id);
    }

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
            <span className="posts__btn-del" onClick={handleDeleteClick}>&times;</span>
        </li>
    )
}

Post.propTypes = {
    title: PropTypes.string,
    content: PropTypes.string,
    id: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired,
}

Post.defaultProps = {
    title: 'Title',
    content: 'Content',
}