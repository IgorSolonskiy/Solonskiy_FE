import {Avatar} from "../image/Avatar";

import Link from "next/link";

export default function SearchUserInfo({user}) {
    return (
        <Link href={`/users/${user.username}`}>
            <li className="btn d-flex text-primary list-group-item list-group-item-action
            flex-column align-items-start justify-content-start border-bottom">
                <div className='d-flex align-items-center justify-content-center'>
                    <Avatar avatar={user.avatar} name={user.name} size={35}/>
                    <div className='ms-3'>
                        <div className='mb-3'>Name: {user.name}</div>
                        <div className='mb-3'>Login: {user.username}</div>
                    </div>
                </div>
            </li>
        </Link>
    )
}