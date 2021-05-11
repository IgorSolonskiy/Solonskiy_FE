import {useSelector} from "react-redux";
import Link from "next/link";

export default function UserProfile() {
    const {users: {user}, posts: {post}, profile: {profile}} = useSelector(state => state);

    return (
        <div className="d-flex align-items-center justify-content-center mt-3">
            <div className='mx-3 h3'>{user ? user.name : profile.name}</div>
            <div className='h3 mx-3'>Login: {user ? user.username : profile.username}</div>
            {
                post &&
                <Link href={`/users/${user ? user.username : profile.username}`}>
                    <span className='btn btn-outline-secondary my-3'>&lArr;</span>
                </Link>
            }
        </div>
    )
}