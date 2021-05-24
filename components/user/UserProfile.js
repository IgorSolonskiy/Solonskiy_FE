import {useSelector} from "react-redux";
import {Avatar} from "../image/Avatar";

import Link from "next/link";

export default function UserProfile() {
    const {profile} = useSelector(state => state.profile);
    const {user} = useSelector(state => state.users);
    const {post} = useSelector(state => state.posts);
    const userName = user ? user.name : profile.name;
    const userAvatar = user ? user.avatar : profile.avatar;
    const userLogin = user ? user.username : profile.username;

    const returnBackLink = user && post ?
        <Link href={`/users/${user.username}`}>
            <span className='btn btn-outline-secondary my-3'>&lArr;</span>
        </Link>
        : null;

    return (
        <div className="d-flex align-items-center justify-content-around w-100 mt-3 mb-3">
            <Avatar avatar={userAvatar}
                    name={userName}
                    size={80}/>
            <div className='mx-3 h3'>{userName}</div>
            <div className='h3 mx-3'>Login: {userLogin}</div>
            {returnBackLink}
        </div>
    )
}