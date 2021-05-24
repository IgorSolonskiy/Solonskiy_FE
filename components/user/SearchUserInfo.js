import {Avatar} from "../image/Avatar";

import Link from "next/link";

export default function SearchUserInfo({user}) {
    return (
        <Link href={`/users/${user.username}`}>
            <li className="btn d-flex text-primary list-group-item align-items-center">
                    <Avatar avatar={user.avatar} name={user.name} size={35}/>
                    <div className='mx-3 text-uppercase'>{user.username}</div>
            </li>
        </Link>
    )
}