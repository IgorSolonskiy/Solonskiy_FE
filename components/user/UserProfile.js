import {useSelector} from "react-redux";
import {Avatar} from "../image/Avatar";

import Link from "next/link";

export default function UserProfile() {
    const {profile} = useSelector(state => state.profile);
    const {user} = useSelector(state => state.users);
    const {post} = useSelector(state => state.posts);

    return (
        <div className="d-flex align-items-center justify-content-around w-100 mt-3">
            <Avatar avatar={ user? user.avatar : profile.avatar}
                    name={ user? user.name : profile.name}
                    size={80}/>
            <div className='mx-3 h3'>{user ? user.name : profile.name}</div>
            <div className='h3 mx-3'>Login: {user ? user.username : profile.username}</div>
            {
                post &&
                <Link href={`/users/${user && user.username}`}>
                    <span className='btn btn-outline-secondary my-3'>&lArr;</span>
                </Link>
            }
        </div>
    )
}