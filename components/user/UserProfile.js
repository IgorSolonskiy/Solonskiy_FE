import {useSelector} from "react-redux";
import Link from "next/link";

export default function UserProfile() {
    const {user} = useSelector((state) => state.user)
    const {post} = useSelector((state) => state.posts)

    return (
        <div className="d-flex align-items-center justify-content-center mt-3">
            <div className='mx-3 h3'>{user.name}</div>
            <div className='h3 mx-3'>Login:{user.username}</div>
            {
                post &&
                <Link href={`/users/${user.username}`}>
                    <span className='btn btn-outline-secondary my-3'>&lArr;</span>
                </Link>
            }
        </div>
    )
}